import os
import re
import fitz  # PyMuPDF
import docx2txt
from docx import Document

def extract_text_and_links(file_path):
    if not os.path.exists(file_path):
        return {"error": f"File '{file_path}' not found."}

    ext = os.path.splitext(file_path)[-1].lower()

    if ext == ".pdf":
        result = extract_from_pdf(file_path)
    elif ext == ".docx":
        result = extract_from_docx(file_path)
    else:
        return {"error": "Unsupported file format. Only PDF and DOCX are supported."}

    # Log parsed results
    if "error" not in result:
        print("Resume Parse Result:")
        print("Resume Text (first 300 characters):", result["text"][:300])
        print("Extracted Links:", result["links"])
    else:
        print("Parse Error:", result["error"])
    return result

def extract_from_pdf(pdf_path):
    text = ""
    links = {"linkedin": None, "github": None, "personal_site": None}
    extracted_urls = []

    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text("text")
            for link in page.get_links():
                url = link.get("uri", "")
                extracted_urls.append(url)

        # Extract additional URLs from text using regex
        text_urls = re.findall(r"https?://[^\s]+", text)
        extracted_urls.extend(text_urls)
        extracted_urls = list(set([u for u in extracted_urls if u and not u.startswith("mailto:")]))

        linkedin = next((u for u in extracted_urls if "linkedin.com" in u), None)
        github = next((u for u in extracted_urls if "github.com" in u), None)
        personal = next((u for u in extracted_urls if u not in [linkedin, github]), None)

        links = {"linkedin": linkedin, "github": github, "personal_site": personal}
        print("Extracted PDF Text (first 300 characters):", text[:300])
        print("Extracted Links:", links)
        return {"text": text.strip(), "links": links}

    except Exception as e:
        return {"error": f"PDF parsing error: {str(e)}"}

def extract_from_docx(docx_path):
    links = {"linkedin": None, "github": None, "personal_site": None}
    full_text = []

    try:
        doc = Document(docx_path)
        for para in doc.paragraphs:
            text = para.text.strip()
            if text:
                full_text.append(text)
                urls = re.findall(r"https?://[^\s]+", text)
                for url in urls:
                    if "linkedin.com" in url:
                        links["linkedin"] = url
                    elif "github.com" in url:
                        links["github"] = url
                    elif "http" in url and not links["personal_site"]:
                        links["personal_site"] = url

        final_text = "\n".join(full_text)
        print("Extracted DOCX Text (first 300 characters):", final_text[:300])
        print("Extracted Links:", links)
        return {"text": final_text.strip(), "links": links}

    except Exception as e:
        return {"error": f"DOCX parsing error: {str(e)}"}

if __name__ == "__main__":
    # Test with a valid resume file path
    result = extract_text_and_links("path/to/resume.docx")
    print("Final Resume Parse Result:", result)