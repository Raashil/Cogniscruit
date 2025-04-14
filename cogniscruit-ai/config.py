from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mistral")
print("OLLAMA_HOST =", OLLAMA_HOST)

# MongoDB Configuration
MONGODB_URI = os.getenv("MONGODB_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "cogniscruit_db")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME", "interview_questions")

# GitHub API
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Optional LinkedIn API (Mocked or Placeholder)
LINKEDIN_TOKEN = os.getenv("LINKEDIN_TOKEN")

# Supported AI models
AVAILABLE_MODELS = {
    "mistral": "mistral",
    "llama3": "llama3:8b"
}

if __name__ == "__main__":
    print("OLLAMA_HOST:", OLLAMA_HOST)
    print("OLLAMA_MODEL:", OLLAMA_MODEL)
    print("MONGODB_URI:", MONGODB_URI)
    print("MONGO_DB_NAME:", MONGO_DB_NAME)
    print("MONGO_COLLECTION_NAME:", MONGO_COLLECTION_NAME)
    print("AVAILABLE_MODELS:", AVAILABLE_MODELS)