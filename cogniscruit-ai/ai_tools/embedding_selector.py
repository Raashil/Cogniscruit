import os
from dotenv import load_dotenv

# Using the updated OllamaEmbeddings from langchain_community.embeddings
from langchain_community.embeddings import OllamaEmbeddings

from config import OLLAMA_MODEL

# Load environment variables from .env file
load_dotenv()

# Optionally read the provider, but currently only "ollama" is supported.
EMBEDDING_PROVIDER = os.getenv("EMBEDDING_PROVIDER", "ollama").lower()

def get_embedding_model():
    """
    Returns an instance of OllamaEmbeddings based on the configured model (e.g., "mistral" or "ollama3").
    
    Returns:
        A LangChain-compatible embedding model instance.
    """
    # Currently only supports Ollama embeddings.
    return OllamaEmbeddings(model=OLLAMA_MODEL)

# Manual test
if __name__ == "__main__":
    embedding = get_embedding_model()
    vector = embedding.embed_query("How does LangChain work?")
    print("Embedding vector size:", len(vector))