import os
import docx2txt
import fitz  # PyMuPDF
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_job_description(file_path):
    if not os.path.exists(file_path):
        return {"error": f"File '{file_path}' not found."}

    file_ext = os.path.splitext(file_path)[-1].lower()

    if file_ext == ".pdf":
        text = extract_pdf_text(file_path)
    elif file_ext == ".docx":
        text = docx2txt.process(file_path)
    elif file_ext == ".txt":
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
    else:
        return {"error": "Unsupported file format."}

    if not text:
        return {"error": "No text extracted from job description file."}

    doc = nlp(text)
    skills = extract_skills(doc)
    job_title = extract_job_title(doc)

    # Log parsed results
    print("Job Description Parse Result:")
    print("Job Title:", job_title)
    print("Skills:", skills)
    print("Job Description (first 300 characters):", text.strip()[:300])

    return {
        "job_title": job_title,
        "skills": skills,
        "text": text.strip()
    }

def extract_pdf_text(pdf_path):
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text()
    except Exception as e:
        print(f"PDF text extraction error: {str(e)}")
    return text.strip()

def extract_skills(doc):
    skills = set()
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"] and token.ent_type_ in ["ORG", "PRODUCT", "SKILL"]:
            skills.add(token.text)
    return list(skills)

def extract_job_title(doc):
    for sent in doc.sents:
        if "looking for" in sent.text.lower() or "hiring" in sent.text.lower():
            return sent.text.strip()
    return "Not specified"

if __name__ == "__main__":
    # Test with a valid job description file path
    result = extract_job_description("path/to/job_description.docx")
    print("Final Job Description Parse Result:", result)