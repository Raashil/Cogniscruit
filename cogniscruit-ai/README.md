# 🧠 Cogniscruit-AI: Intelligent Interview Question Generator

This module is responsible for generating personalized interview questions based on uploaded resumes and job descriptions, powered by LangChain, Ollama models (e.g., Mistral, LLaMA3), and Flask API.

---

## 🚀 Quick Start

### Step 1: Install Dependencies

**Create and activate a virtual environment (optional but recommended):**

```bash
python3.12 -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

**Install all dependencies:**

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 2: Start Ollama & Pull AI Models

- **Install Ollama:** [https://ollama.com/download](https://ollama.com/download)

**Start the Ollama service:**
```bash
ollama serve
```

**Pull required models:**
```bash
ollama pull mistral
ollama pull llama3
```

### Step 3: Run the Application

```bash
python main.py                 # Uses default model mistral
python main.py llama3          # Optional
```

The Flask server will start at:
```
http://127.0.0.1:5001
```

> 💡 OpenAI and Gemini are optional model choices. To use them, you need to set up your own API keys and call their cloud-based APIs manually.

---

## 📡 API Testing via CURL

### Upload Resume
```bash
curl -X POST -F "file=@/path/to/your_resume.pdf" http://127.0.0.1:5001/upload-resume
```

### Upload Job Description
```bash
curl -X POST -F "file=@/path/to/job_description.docx" http://127.0.0.1:5001/upload-jd
```

### Generate Questions
```bash
curl -X POST http://127.0.0.1:5001/generate-questions
```

_Result: JSON list of 20 interview questions._

---

## 💬 Interactive Follow-up Questions

### How It Works

1. User clicks “Continue Interaction”
2. System asks: _"What style of question would you like?"_ → e.g., `coding`, `behavioral`, `system design`, etc.
3. User replies with a style (e.g., `coding`)
4. System asks: _"What specific subtopic?"_ → e.g., `python multithreading`, `parallel programming`, etc.
5. Follow-up questions are generated in real time using your selected model.

### Key Features

- 🧠 3-step session management via `interactive_session_state.py`
- 🗃️ MongoDB stores interaction history
- ✏️ Flexible inputs (custom subtopics)
- 🔗 API-ready for frontend or Postman integration

### Follow-up API Calls

**Start Follow-up Session**
```bash
curl -X POST http://127.0.0.1:5001/start-followup \
  -H "Content-Type: application/json" \
  -d '{"record_id": "<main_record_id>"}'
```

**User Responds to Interaction**
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

**ID Relationships**
- `record_id` → Generated from `/generate-questions`
- `session_id` → Created by `/start-followup`
- `followup_id` → MongoDB internal ID

---

## 📡 API Endpoints

| Endpoint               | Method | Description                            |
|------------------------|--------|----------------------------------------|
| `/upload-resume`       | POST   | Uploads a resume file                  |
| `/upload-jd`           | POST   | Uploads a job description file         |
| `/generate-questions`  | POST   | Generates questions using AI           |
| `/start-followup`      | POST   | Starts interactive follow-up session   |
| `/interactive-followup`| POST   | Handles user input during interaction  |

---

## 🧠 AI Models & Architecture

- **LLMs:** Mistral, LLaMA3 (Ollama), GPT-4, Gemini
- **LangChain Pipelines:** Multi-step reasoning & routing
- **Parsing:** spaCy, docx2txt, PyMuPDF
- **Vector Matching:** FAISS + scikit-learn
- **MongoDB:** Stores Q&A + sessions
- **RAG:** Resume vs JD semantic relevance

---

## 📎 Resume Link Format Requirements

| Type         | Required Format                    | Example                                      |
|--------------|-------------------------------------|----------------------------------------------|
| **GitHub**   | Must contain `github.com/username` | ✅ `https://github.com/jonathan`              |
| **LinkedIn** | Must contain `linkedin.com/in/`    | ✅ `https://linkedin.com/in/jonathan-dev`     |
| **Website**  | Must start with `http(s)://`       | ✅ `https://jonathan.dev`                     |

🚫 Avoid formats like:
- `linkedin.com/jonathan`
- `github.com`
- `jonathan.com`

These links are extracted by `resume_parser.py` and used by scraping agents.

---

## 🧩 Frontend Integration Checklist

- [x] Upload resume & JD via file inputs
- [x] Trigger `/generate-questions` after upload
- [x] Display 20 questions as Q&A
- [x] Let user initiate `/start-followup` and `/interactive-followup`
- [ ] Optionally add model selector (llama3, mistral)

---

## ⚠️ Common Issues & Fixes

| Issue                                | Fix                                   |
|-------------------------------------|----------------------------------------|
| `spaCy` or `blis` install fails     | Run: `xcode-select --install`         |
| Ollama not running                  | Run: `ollama serve`                   |
| Models not found                    | Run: `ollama pull mistral`            |
| Wrong port                          | Flask default is `5001` (see `main.py`)|

---

## 📁 Folder Structure

```text
cogniscruit-ai/
├── main.py                           # Flask API entry point
├── requirements.txt                  # Python dependencies
├── .env                              # Environment variables
├── README.md                         # Project documentation
│
├── uploads/                          # Uploaded resume & JD files
│
├── data_processing/                  # Raw data extraction
│   ├── resume_parser.py
│   ├── jd_parser.py
│   └── fetch_profile_data.py
│
├── ai_tools/                         # AI analysis agents
│   ├── model_selector.py
│   ├── embedding_selector.py
│   ├── github_agent.py
│   ├── scraping_agent.py
│   ├── linkedin_agent.py
│   └── rag_vector_search.py
│
├── generateQuestions/                # Main pipeline
│   └── sequential_chain.py
│
├── interactive/                      # Follow-up module
│   ├── interactive_questions.py
│   └── interactive_session_state.py
│
├── database/                         # MongoDB connector
│   └── mongo_client.py
│
├── templates/                        # Prompt templates
│   └── interview_template.txt
```

---

## 🔍 Project Summary

- **Tech Stack:** Flask, LangChain, MongoDB, Ollama
- **Model Support:** Mistral, LLaMA3
- **Endpoints:** `/upload-resume`, `/generate-questions`, `/start-followup`, etc.
- **Interactive Mode:** Session-based real-time Q&A
- **Deployment:** Local via `python main.py`





