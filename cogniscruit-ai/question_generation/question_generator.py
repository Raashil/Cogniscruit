import os
from data_processing.resume_parser import extract_text_and_links  # ✅ Extract text + links from resume
from data_processing.fetch_profile_data import fetch_linkedin_profile, fetch_github_data, fetch_website_text
from ollama import Client

# ✅ Ollama AI Model Config
OLLAMA_HOST = "http://127.0.0.1:11435"
OLLAMA_MODEL = "mistral"

client = Client(host=OLLAMA_HOST)

def generate_interview_questions(resume_text, job_description, linkedin_data=None, github_data=None, website_data=None):
    """Generate at least 10 interview questions categorized by source (Resume, LinkedIn, GitHub, Website)."""

    extra_info = ""
    if linkedin_data:
        extra_info += f"\n🔹 LinkedIn Profile:\n{linkedin_data}"
    if github_data:
        extra_info += f"\n🔹 GitHub Profile:\n{github_data}"
    if website_data:
        extra_info += f"\n🔹 Website Summary:\n{website_data}"


    # ✅ Print Extracted Data for Debugging
    print("\n📢 Extracted Data for Interview Questions:")
    print(f"🔹 LinkedIn Data:\n{linkedin_data}\n")
    print(f"🔹 GitHub Data:\n{github_data}\n")
    print(f"🔹 Website Data:\n{website_data}\n")

    # ✅ Updated AI Prompt to Categorize Questions
    prompt = f"""
    You are an AI expert interviewer.
    Your task is to analyze the **job description**, **candidate resume**, and **online profiles (LinkedIn, GitHub, Website)** 
    to generate **more than 10 categorized interview questions**.

    - Label each question with its source: **(Resume-Based), (LinkedIn-Based), (GitHub-Based), (Website-Based)**.
    - **If a question references a GitHub project, use its actual repository name** instead of generic placeholders like "Project X".
    - If a question is based on multiple sources, include multiple tags.
    - Focus on **technical and behavioral** questions based on the candidate's experience and the job role.

    **Job Description:**
    {job_description}

    **Candidate Resume:**
    {resume_text}

    **Additional Online Data:** 
    {extra_info if extra_info else "No additional online profile data available."}

    **Generate at least 10 structured interview questions with their sources in this format:**
    
    1. (Resume-Based) [Question]
    2. (LinkedIn-Based) [Question]
    3. (GitHub-Based) [Question]
    4. (Website-Based) [Question]
    5. (Resume + GitHub-Based) [Question]
    ...
    10. (Resume-Based) [Question]
    """

    try:
        response = client.chat(model=OLLAMA_MODEL, messages=[
            {"role": "system", "content": "You are an AI interviewer. Generate 10 categorized interview questions based on the resume, job description, and online profiles."},
            {"role": "user", "content": prompt}
        ])
        
        if "message" in response and "content" in response["message"]:
            return response["message"]["content"]
        else:
            return "⚠️ Error: No questions generated."
    
    except Exception as e:
        print(f"\n❌ Ollama API Error: {str(e)}")
        return "⚠️ Error communicating with AI."