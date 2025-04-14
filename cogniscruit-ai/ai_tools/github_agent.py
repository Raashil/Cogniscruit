import logging
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from ai_tools.model_selector import get_llm

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def analyze_github_profile(github_data, model_name="mistral"):
    logger.info("Initializing LLM with model: %s", model_name)
    llm = get_llm(model_name)
    if not llm:
        logger.error("Model initialization failed for model: %s", model_name)
        return "Error: Model initialization failed."
    
    # Log the received GitHub data
    logger.info("GitHub data received: %s", github_data)
    
    prompt = PromptTemplate(
        input_variables=["github_data"],
        template="""
You are a technical recruiter. Analyze the following GitHub repositories and determine what technologies the candidate uses most often and what types of projects they work on.

GitHub Data:
{github_data}

Return a summary of key skills and 3 relevant technical interview questions.
"""
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    logger.info("Running LLMChain with the given prompt...")
    result = chain.run({"github_data": github_data})
    logger.info("LLMChain returned: %s", result)
    return result

if __name__ == "__main__":
    # Test case
    sample_data = "Repo1: Python, Flask; Repo2: JavaScript, React"
    output = analyze_github_profile(sample_data)
    print("GitHub Agent Output:\n", output)