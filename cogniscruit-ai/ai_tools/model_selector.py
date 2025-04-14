from config import AVAILABLE_MODELS, OLLAMA_MODEL, OLLAMA_HOST
from langchain_ollama import OllamaLLM

def list_models():
    """Return a list of supported model keys."""
    return list(AVAILABLE_MODELS.keys())

def get_llm(model_name: str = None):
    """
    Returns an OllamaLLM instance with the selected model.

    Args:
        model_name (str): Optional model name (e.g., "mistral", "llama3").
                          If not specified, defaults to OLLAMA_MODEL.

    Returns:
        OllamaLLM instance.
    """
    # Use provided model_name or default from configuration
    model_key = model_name or OLLAMA_MODEL
    model_id = AVAILABLE_MODELS.get(model_key.lower())

    if not model_id:
        raise ValueError(f"Invalid model: '{model_key}'. Available models: {list_models()}")

    print(f"[LLM] Using model: {model_id} via Ollama at {OLLAMA_HOST}")
    return OllamaLLM(model=model_id, base_url=OLLAMA_HOST) 

# Manual test
if __name__ == "__main__":
    print("Available Models:", list_models())
    llm = get_llm("mistral")
    response = llm.invoke("What is LangChain?")
    print("Sample Response:\n", response)