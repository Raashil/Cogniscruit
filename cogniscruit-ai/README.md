
🧠 Cogniscruit-AI: Intelligent Interview Question Generator

This module is responsible for generating personalized interview questions based on uploaded resumes and job descriptions, powered by LangChain, Ollama models (e.g., Mistral, LLaMA3), and Flask API.

🚀 Quick Start

1. 📦 Install Dependencies

**Create and activate a virtual environment (optional but recommended):**

python3.12 -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

**Install all dependencies:**

pip install --upgrade pip
pip install -r requirements.txt

2. 🤖 Start Ollama & Pull AI Models

**Install Ollama: https://ollama.com/download**

**Start the Ollama service:**

ollama serve

**Pull required models:**

ollama pull mistral
ollama pull llama3

3. 🧪 Run the Application

python main.py                 # Uses default model mistral
python main.py llama3         # Optional
python main.py mistral

💡 OpenAI and Gemini are optional model choices.
To use them, you need to set up your own API keys and call their cloud-based APIs manually.
These models are not included in the default local deployment.

This launches a Flask server at:
http://127.0.0.1:5001

🧪 Demo Testing via CURL
	1.	Upload Resume:

curl -X POST -F "file=@ /path/to/your_resume.pdf/docx" http://127.0.0.1:5001/upload-resume

	2.	Upload Job Description:

curl -X POST -F "file=@/path/to/job_description.docx" http://127.0.0.1:5001/upload-jd

	3.	Generate Questions:

curl -X POST http://127.0.0.1:5001/generate-questions

Result: JSON list of 20 interview questions.

💬 Interactive Follow-up Questions (Three-step Session Flow)
After the initial 20 personalized interview questions are generated, users have the option to continue with **interactive follow-up questions** tailored to a specific style and subtopic.

🔄 Workflow

1. **User clicks “Continue Interaction”**
2. System asks: _"What style of question would you like?"_  
   → e.g., `coding / behavioral / system design / product / research / ...`
3. User replies with a style (e.g., `coding`)
4. System asks: _"What specific subtopic?"_  
   → e.g., `python multithreading`, `parallel programming`, `LLMs`, etc.
5. Follow-up questions are generated in real-time using your selected model.

The system supports custom user input, not limited to predefined topics.

🧠 Key Features
 3-step session management using `interactive_session_state.py`
 MongoDB stores all interaction history per session
 Flexible inputs: user can type their own subtopics freely
 Clean API endpoints for frontend or Postman integration


**Example API Calls**
Start Follow-up Session
```bash
curl -X POST http://127.0.0.1:5001/start-followup \
  -H "Content-Type: application/json" \
  -d '{"record_id": "<main_record_id>"}'
```

# Continue Interaction
```bash
curl -X POST http://127.0.0.1:5001/interactive-followup \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "Type your session_id",
    "user_input": "yes/no"
}'
```

# Continue Interaction
```bash
curl -X POST http://127.0.0.1:5001/interactive-followup \
  -H "Content-Type: application/json" \
  -d '{"session_id": "<session_id>", "user_input": "e.g., coding"}'
```

```bash
curl -X POST http://127.0.0.1:5001/interactive-followup \
  -H "Content-Type: application/json" \
  -d '{"session_id": "<session_id>", "user_input": "e.g., python multithreading"}'
```

📌 ID Relationships & Session Flow
`record_id` → Generated when calling `/generate-questions`
`session_id` → Created when user starts follow-up session via `/start-followup`
`followup_id` → MongoDB’s internal ID for tracking each round


 📡 API Endpoints

| Endpoint             | Method | Description                            |
|----------------------|--------|----------------------------------------|
| `/upload-resume`     | POST   | Uploads a resume file                  |
| `/upload-jd`         | POST   | Uploads a job description file         |
| `/generate-questions`| POST   | Generates questions using AI           |
| `/start-followup`    | POST   | Starts interactive follow-up session   |
| `/interactive-followup` | POST | Handles user input during interaction |


🧠 AI Models & Architecture
	•	LLMs: Mistral, LLaMA3 (via Ollama)
	•	LangChain Pipelines: Orchestrates steps
	•	Parsing: spaCy, docx2txt, PyMuPDF
	•	Vector Matching: FAISS + scikit-learn
	•	MongoDB: stores all Q&A and follow-up sessions stores all Q&A and follow-up sessions
    •	Semantic Matching: FAISS + sklearn (via RAG)

📎 Resume Link Format Requirements
For the best performance in link-based data extraction:

| Type         | Required Format                                     | Example                                      |
|--------------|------------------------------------------------------|----------------------------------------------|
| **GitHub**   | Must contain `github.com/username`                  | ✅ `https://github.com/jonathan`         |
| **LinkedIn** | Must contain `linkedin.com/in/`                     | ✅ `https://www.linkedin.com/in/jonathan-dev` |
| **Website**  | Must start with `http://` or `https://`             | ✅ `https://jonathan.dev`                     |

Avoid formats like:
- `linkedin.com/jonathan` ❌ (missing `/in/`)
- `github.com` ❌ (no username)
- `jonathan.com` ❌ (missing protocol)

These links are extracted by `resume_parser.py` and used in downstream scraping agents. Invalid links may result in failed data enrichment.



🧩 Frontend Integration Tips

Frontend should:
	•	Upload resume + JD via file inputs
	•	Trigger /generate-questions once both uploaded
	•	Display JSON result as Q&A
    •	Allow user to continue with `/start-followup` then `/interactive-followup`
	•	Optionally provide dropdown to choose model (llama3, mistral)

📦 Common Issues
	•	spaCy / blis install fails → run: xcode-select –install
	•	Ollama must be running (ollama serve)
	•	Models not found → run ollama pull mistral
	•	Flask default port is 5001, changeable in main.py


📁 Folder Structure

cogniscruit-ai/
│
├── main.py                           # Flask API entry point
├── requirements.txt                  # Python dependencies
├── .env                              # Environment variables (MongoDB, Ollama host, API keys)
├── README.md                         # Project documentation (recommended)
│
├── uploads/                          # Stores uploaded resume and job description files
│
├── data_processing/                  # 📦 Extract raw data
│   ├── resume_parser.py              # Extract text and links from resumes
│   ├── jd_parser.py                  # Extract text from job descriptions
│   └── fetch_profile_data.py         # GitHub/LinkedIn/Website scraping or API fetch
│
├── ai_tools/                         # 🧠 Intelligent analysis agents
│   ├── model_selector.py             # Chooses LLM backend (Mistral, GPT-4, Gemini...)
│   ├── embedding_selector.py         # Chooses embedding model (for RAG)
│   ├── github_agent.py               # Analyzes GitHub projects and generates questions
│   ├── scraping_agent.py             # Analyzes personal website branding
│   ├── linkedin_agent.py             # Analyzes scraped LinkedIn content
│   └── rag_vector_search.py          # Resume vs JD semantic matching using RAG
│
├── generateQuestions/                # 🎯 Main question generation pipeline
│   └── sequential_chain.py           # Calls all agents and generates 20 personalized questions
│
├── interactive/                      # 💬 Interactive follow-up question module
│   ├── interactive_questions.py      # Three-step dialog logic for coding/behavioral follow-up
│   └── interactive_session_state.py  # Manages session state using MongoDB
│
├── database/                         # 🗃️ MongoDB integration
│   └── mongo_client.py               # Connects to MongoDB and stores question records
│
├── templates/                        # 📄 Prompt templates
│   └── interview_template.txt        # Main LangChain prompt for question generation

⸻

🔍 Project Overview
🚀 Tech Stack (Flask + LangChain + MongoDB + Ollama)
🧠 Model Support (Mistral, GPT-4, Gemini)
🗂️ File Structure (see above)
⚙️  How to Run (venv + Python + curl/Postman)
📡 API Endpoints (/upload-resume, /generate-questions, /start-followup, etc.)
📦 Deployment Guide (Local)
