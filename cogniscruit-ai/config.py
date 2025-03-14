import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Ollama configuration
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11435")  # Local Ollama server
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mistral")  # Default model: "mistral"