import os
from langchain.prompts import PromptTemplate
from datetime import datetime
from langchain.chains.llm import LLMChain
from ai_tools.model_selector import get_llm
from database.mongo_client import store_questions
from ai_tools.github_agent import analyze_github_profile
from ai_tools.scraping_agent import analyze_website_data
from ai_tools.linkedin_agent import analyze_linkedin_profile
from ai_tools.rag_vector_search import match_relevance

# Load the prompt template from a .txt file
def load_prompt_template():
    template_path = os.path.join(os.path.dirname(__file__), "..", "templates", "interview_template.txt")
    abs_template_path = os.path.abspath(template_path)
    print("DEBUG - Template path is:", abs_template_path)
    print("DEBUG - Current working directory:", os.getcwd())
    try:
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print(f"Error loading prompt template: {e}")
        # Fallback template if file is missing or unreadable
        return (
            "Candidate Resume: {resume_text}\n"
            "Job Description: {job_description}\n"
            "GitHub Insights: {github_insights}\n"
            "LinkedIn Insights: {linkedin_insights}\n"
            "Website Insights: {website_insights}\n"
            "Generate 20 personalized technical interview questions."
        )

# Main function to generate personalized interview questions
def generate_personalized_questions(resume_text, jd_text, linkedin_data, github_data, website_data, model_name=None):
    # Load the prompt template BEFORE entering try block to ensure it is always defined
    BASE_TEMPLATE = load_prompt_template()

    try:
        # Step 1: Perform semantic matching between resume and job description
        relevant_chunks = match_relevance(resume_text, jd_text)
        rag_context = "\n".join(relevant_chunks)
        print("DEBUG - RAG Matched Context:\n", rag_context)

        # Step 2: Analyze GitHub data using a LangChain agent
        github_insights = analyze_github_profile(github_data)
        print("DEBUG - GitHub Insights:\n", github_insights)

  # Step 3: Analyze LinkedIn data using the LLM agent
        linkedin_insights = analyze_linkedin_profile(linkedin_data)
        print("DEBUG - LinkedIn Insights:\n", linkedin_insights)

        # Step 4: Analyze website data
        website_insights = analyze_website_data(website_data)
        print("DEBUG - Website Insights:\n", website_insights)

        # Step 5: Combine all context into one string for the prompt
        full_context = (
            f"Resume Text:\n{resume_text}\n\n"
            f"Job Description:\n{jd_text}\n\n"
            f"RAG Matched Context:\n{rag_context}\n\n"
            f"GitHub Insights:\n{github_insights}\n\n"
            f"LinkedIn Insights:\n{linkedin_insights}\n\n"
            f"Website Insights:\n{website_insights}\n\n"
        )

    except Exception as e:
        print("ERROR assembling full context:", e)
        full_context = "Resume and JD uploaded, but one or more external data sources failed to load."

    print("DEBUG - Full Context for LLM:\n", full_context)

    # Step 6: Create a LangChain prompt and run the chain
    prompt = PromptTemplate(
        input_variables=["context"],
        template=BASE_TEMPLATE
    )
    llm = get_llm(model_name)
    chain = LLMChain(llm=llm, prompt=prompt)

    # Step 7: Run the chain and get the generated questions
    output = chain.run({"context": full_context})

    # Step 8: Save all relevant information to MongoDB
    store_questions({
        "generated_questions": output,
        "source": "resume + job_description + github + linkedin + website",
        "model": model_name or "mistral (default)", 
        "timestamp": datetime.utcnow()
    })

    return output

# For debugging purposes (you can run this file directly to test)
if __name__ == "__main__":
    sample_resume = (
        "Sample resume text showing experience with Python, LangChain, and backend development. "
        "Candidate has built multiple AI applications."
    )
    sample_jd = (
        "We are hiring an AI engineer with experience in LLMs, LangChain, and cloud deployment. "
        "The candidate should be able to integrate third-party APIs and build end-to-end pipelines."
    )
    sample_linkedin = "https://www.linkedin.com/in/sampleprofile/"
    sample_github = {"repos": [{"name": "Awesome-AI", "description": "AI tools and pipelines"}]}
    sample_website = {
        "title": "John Doe AI Portfolio",
        "description": "Projects on GPT, LangChain, and vector databases.",
        "keywords": "AI, LangChain, GPT"
    }

    result = generate_personalized_questions(
        sample_resume,
        sample_jd,
        sample_linkedin,
        sample_github,
        sample_website
    )
    print("Generated Questions:\n", result)