from flask import Flask, request, jsonify
from question_generation.question_generator import generate_interview_questions
from data_processing.resume_parser import extract_text_and_links  
from data_processing.fetch_profile_data import fetch_linkedin_profile, fetch_github_data, fetch_website_text
import os
import chardet

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Store latest uploaded file names dynamically
LATEST_RESUME_FILE = None  
LATEST_DESCRIPTION_FILE = None  

@app.route("/upload-description", methods=["POST"])
def upload_description():
    """Upload Job Description."""
    global LATEST_DESCRIPTION_FILE  

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    LATEST_DESCRIPTION_FILE = file_path  
    return jsonify({"message": "Job description uploaded successfully", "file_path": file_path})

@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    """Upload Resume."""
    global LATEST_RESUME_FILE  

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    LATEST_RESUME_FILE = file_path  
    return jsonify({"message": "Resume uploaded successfully", "file_path": file_path})

def detect_encoding(file_path):
    """Detect file encoding before reading."""
    with open(file_path, "rb") as f:
        raw_data = f.read()
    return chardet.detect(raw_data)["encoding"]

@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    """Generate interview questions using latest uploaded resume & JD."""
    
    if not LATEST_RESUME_FILE or not os.path.exists(LATEST_RESUME_FILE):
        return jsonify({"error": "Resume file missing. Upload it first."}), 400
    if not LATEST_DESCRIPTION_FILE or not os.path.exists(LATEST_DESCRIPTION_FILE):
        return jsonify({"error": "Job description file missing. Upload it first."}), 400

    resume_data = extract_text_and_links(LATEST_RESUME_FILE)
    resume_text = resume_data["text"]
    extracted_links = resume_data["links"]

    encoding = detect_encoding(LATEST_DESCRIPTION_FILE)
    with open(LATEST_DESCRIPTION_FILE, "r", encoding=encoding, errors="replace") as file:
        job_description = file.read().strip()

    questions = generate_interview_questions(resume_text, job_description)
    return jsonify({"interview_questions": questions})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)