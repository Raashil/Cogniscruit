
import re

def clean_html_regex(raw_html):
    if raw_html is None:
        return ""
    cleanr = re.compile('<.*?>')
    return re.sub(cleanr, '', raw_html).strip()

def get_linkedin_data(linkedin_data):
    linkedin_expereince = "\n".join(
        f"""
            - Company Name: {exp.get('company')}
            - Title : {exp.get('title')}
            - Work Description: { exp['description'] }

                    """.strip() for exp in linkedin_data['experiences'][:5]
                )
    return linkedin_expereince


def generate_repo_details(github_data):
    repo_details = "\n".join(
        f"""
           
            - Name: {repo['name']}
            - Description: { clean_html_regex(repo.get('description')) }
            - Language: {repo.get('language') or 'Not specified'}

                    """.strip() for repo in github_data['repositories'][:5]
                )
    return repo_details

def generate_prompt(job):
    linkedin_data = get_linkedin_data(job['linkedin_data'])
    repo_details = generate_repo_details(job['github_data'])
    job_description = job['job_description']
    behavioural_prompt = f"""
            You are a helpful interview assistant. Based on the following candidate profile and job description, generate 10 **behavioral interview questions** tailored to the candidate’s previous experiences and the expectations for this job role.

            --- CANDIDATE PROFILE ---

            LinkedIn Work Experience:
            {linkedin_data.strip()}


            GitHub Repositories Summary:
            {repo_details.strip()}

            --- JOB DESCRIPTION ---

            {job_description.strip()}

            --- TASK ---

            Generate 10 **behavioral** interview questions that assess the candidate's soft skills, problem-solving approaches, teamwork, leadership, adaptability, and communication — making strong connections to their technical background and the job description.
            Only 10 questions numbered from 1 to 10 and nothing else.
            """
    
    technical_prompt = f"""
            You are a helpful interview assistant. Based on the following candidate profile and job description, generate 10 **technical interview questions** tailored to the candidate’s previous experiences and the expectations for this job role.

            --- CANDIDATE PROFILE ---

            LinkedIn Work Experience:
            {linkedin_data.strip()}


            GitHub Repositories Summary:
            {repo_details.strip()}

            --- JOB DESCRIPTION ---

            {job_description.strip()}

            --- TASK ---

            Generate 10 **technical** interview questions that assess the candidate's technical skills, problem-solving approaches, teamwork, leadership, adaptability, and communication — making strong connections to their technical background and the job description.
            Only 10 questions numbered from 1 to 10 and nothing else.
            """

    return behavioural_prompt,technical_prompt
        