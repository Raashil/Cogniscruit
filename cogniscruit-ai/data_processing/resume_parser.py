import os
import re
import docx2txt  # ✅ Extract text from DOCX
import fitz  # ✅ Extract text and links from PDFs
from xml.etree import ElementTree as ET  # ✅ Extract links from DOCX (using XML parsing)

def extract_text_and_links(file_path):
    """
    Extracts text and hyperlinks from a PDF or DOCX file.
    - Automatically detects file type.
    - Extracts both text and links from the file.
    """
    if not os.path.exists(file_path):
        raise ValueError(f"❌ File '{file_path}' not found.")

    file_ext = os.path.splitext(file_path)[-1].lower()
    
    try:
        if file_ext == ".pdf":
            return extract_from_pdf(file_path)
        elif file_ext == ".docx":
            return extract_from_docx(file_path)
        else:
            raise ValueError("❌ Unsupported file format. Only PDF and DOCX are supported.")
    except Exception as e:
        return {"error": f"⚠️ Failed to extract text: {str(e)}"}

import re

def extract_from_pdf(pdf_path):
    """Extracts text & links from a PDF file (supports URLs without 'https')."""
    text = ""
    links = {"linkedin": None, "github": None, "personal_site": None}

    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text("text")  # Extract text content
            
            # ✅ Extract URLs using regex (supports missing 'https://')
            found_urls = re.findall(r"(https?://[^\s]+|www\.[^\s]+|linkedin\.com/[^\s]+|github\.com/[^\s]+)", text)
            for url in found_urls:
                if "linkedin.com" in url:
                    links["linkedin"] = url if url.startswith("http") else f"https://{url}"
                elif "github.com" in url:
                    links["github"] = url if url.startswith("http") else f"https://{url}"
                elif "http" in url or "www." in url:
                    links["personal_site"] = url if url.startswith("http") else f"https://{url}"
                    
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
    """Extracts hyperlinks from a DOCX file using XML parsing."""
    links = {"linkedin": None, "github": None, "personal_site": None}
    try:
        with open(docx_path, "rb") as file:
            content = file.read()
            tree = ET.ElementTree(ET.fromstring(content))
            for elem in tree.iter():
                if elem.tag.endswith("hyperlink") and "http" in elem.attrib.get("url", ""):
                    url = elem.attrib["url"]
                    if "linkedin.com" in url:
                        links["linkedin"] = url
                    elif "github.com" in url:
                        links["github"] = url
                    elif "http" in url:
                        links["personal_site"] = url
    except Exception as e:
        print(f"⚠️ Error extracting links from DOCX: {str(e)}")

    return links