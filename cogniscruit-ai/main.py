import os
import sys
from flask import Flask, request, jsonify
from data_processing.resume_parser import extract_text_and_links
from data_processing.jd_parser import extract_job_description
from data_processing.fetch_profile_data import fetch_github_data, fetch_website_metadata, fetch_linkedin_data
from generateQuestions.sequential_chain import generate_personalized_questions
from interactive.interactive_questions import generate_followup_questions_api
from interactive.interactive_session_state import create_session, update_session, get_session

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

LATEST_RESUME = None
LATEST_JD = None

if len(sys.argv) > 1:
    selected_model = sys.argv[1]
    print("Selected model from command line:", selected_model)
else:
    selected_model = None

@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    global LATEST_RESUME
    if "file" not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400
    file = request.files["file"]
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)
    LATEST_RESUME = path
    return jsonify({"message": "Resume uploaded", "path": path})

@app.route("/upload-jd", methods=["POST"])
def upload_jd():
    global LATEST_JD
    if "file" not in request.files:
        return jsonify({"error": "No JD file uploaded"}), 400
    file = request.files["file"]
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)
    LATEST_JD = path
    return jsonify({"message": "Job description uploaded", "path": path})

@app.route("/generate-questions", methods=["POST"])
def generate():
    if not LATEST_RESUME or not LATEST_JD:
        return jsonify({"error": "Resume and JD must be uploaded first."}), 400
    resume_data = extract_text_and_links(LATEST_RESUME)
    jd_data = extract_job_description(LATEST_JD)
    linkedin_url = fetch_linkedin_data(resume_data["links"].get("linkedin"))
    github_data = fetch_github_data(resume_data["links"].get("github"))
    website_data = fetch_website_metadata(resume_data["links"].get("personal_site"))
    questions = generate_personalized_questions(
        resume_data["text"],
        jd_data["text"],
        linkedin_url,
        github_data,
        website_data,
        selected_model 
    )
    return jsonify({"questions": questions})

@app.route("/start-followup", methods=["POST"])
def start_followup():
    data = request.get_json()
    record_id = data.get("record_id")

    if not record_id:
        return jsonify({"error": "Missing record_id"}), 400

    session_id = create_session(record_id)
    return jsonify({
        "session_id": session_id,
        "message": "Would you like to explore follow-up questions? (yes/no)"
    })

@app.route("/interactive-followup", methods=["POST"])
def interactive_followup():
    data = request.get_json()
    session_id = data.get("session_id")
    user_input = data.get("user_input", "").strip()

    if not session_id:
        return jsonify({"error": "Missing session_id"}), 400

    session = get_session(session_id)
    if not session:
        return jsonify({"error": "Invalid session_id"}), 404

    state = session.get("state")
    record_id = session.get("record_id")

    # Step 1: Waiting for user confirmation (yes/no)
    if state == "waiting_for_confirmation":
        if user_input.lower() in ["yes", "y"]:
            update_session(session_id, {"state": "waiting_for_style"})
            return jsonify({"message": "Great! What kind of questions would you like? (e.g., coding / behavioral / system design / ...)"})
        else:
            update_session(session_id, {"state": "ended"})
            return jsonify({"message": "No problem. Let us know if you'd like to continue later."})

    # Step 2: Waiting for user to choose a style
    elif state == "waiting_for_style":
        update_session(session_id, {"state": "waiting_for_subtopic", "style": user_input})
        return jsonify({"message": f"Please specify a topic within {user_input} (e.g., Python / multithreading / algorithms / ...)"})

    # Step 3: Waiting for subtopic, then generate questions
    elif state == "waiting_for_subtopic":
        style = session.get("style", "general")
        subtopic = user_input
        payload = {
            "record_id": record_id,
            "style": style,
            "subtopic": subtopic
        }
        result = generate_followup_questions_api(payload)
        update_session(session_id, {"state": "completed", "subtopic": subtopic})
        return jsonify(result)

    # Session is already completed
    elif state == "completed":
        return jsonify({"message": "This session is already completed. Start a new one for more."})

    # Unknown state handler
    else:
        return jsonify({"error": "Unexpected session state."}), 500

        

if __name__ == "__main__":
    fixed_port = 5001
    print(f"tarting Flask app on fixed port: {fixed_port}")
    print(f"Try this curl:\ncurl -X POST http://127.0.0.1:{fixed_port}/generate-questions -H \"Content-Type: application/json\" -d '{{\"input\": \"test\"}}'")
    app.run(debug=True, port=fixed_port)