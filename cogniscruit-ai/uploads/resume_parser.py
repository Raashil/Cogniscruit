import os
import docx2txt  # ✅ Extract text from DOCX
import fitz  # ✅ Extract text and links from PDFs
from docx import Document  # ✅ Extract links correctly from DOCX

def extract_text_and_links(file_path):
    """
    Extracts text and hyperlinks from a PDF or DOCX file.
    - Automatically detects file type.
    - Extracts both text and links from the file.
    """
    if not os.path.exists(file_path):
        return {"error": f"❌ File '{file_path}' not found."}

    file_ext = os.path.splitext(file_path)[-1].lower()
    
    try:
        if file_ext == ".pdf":
            return extract_from_pdf(file_path)
        elif file_ext == ".docx":
            return extract_from_docx(file_path)
        else:
            return {"error": "❌ Unsupported file format. Only PDF and DOCX are supported."}
    except Exception as e:
        return {"error": f"⚠️ Failed to extract text: {str(e)}"}

def extract_from_pdf(pdf_path):
    """Extracts text & links from a PDF file."""
    text = ""
    links = {"linkedin": None, "github": None, "personal_site": None}

    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text("text")  # Extract text content
            
            # ✅ Extract Links
            for link in page.get_links():
                url = link.get("uri", "")
                if "linkedin.com" in url:
                    links["linkedin"] = url
                elif "github.com" in url:
                    links["github"] = url
                elif "http" in url:
                    links["personal_site"] = url
    except Exception as e:
        return {"error": f"❌ PDF processing failed: {str(e)}"}

    return {"text": text.strip() or "⚠️ No text extracted.", "links": links}

def extract_from_docx(docx_path):
    """Extracts text and hyperlinks from a DOCX file."""
    try:
        text = docx2txt.process(docx_path)  # ✅ Extract text
        links = extract_links_from_docx(docx_path)  # ✅ Extract links
        return {"text": text.strip() or "⚠️ No text found in the document.", "links": links}
    except Exception as e:
        return {"error": f"❌ Error reading DOCX: {str(e)}"}

def extract_links_from_docx(docx_path):
    """Extracts hyperlinks from a DOCX file correctly using python-docx."""
    links = {"linkedin": None, "github": None, "personal_site": None}
    try:
        doc = Document(docx_path)
        for para in doc.paragraphs:
            for run in para.runs:
                if run.hyperlink:
                    url = run.hyperlink.target
                    if "linkedin.com" in url:
                        links["linkedin"] = url
                    elif "github.com" in url:
                        links["github"] = url
                    elif "http" in url:
                        links["personal_site"] = url
    except Exception as e:
        print(f"⚠️ Error extracting links from DOCX: {str(e)}")

    return links