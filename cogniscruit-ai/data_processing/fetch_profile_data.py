import requests
from bs4 import BeautifulSoup

def fetch_linkedin_profile(url):
    if not url or "linkedin.com" not in url:
        return None
    return f"LinkedIn profile exists: {url}"

def fetch_github_data(github_url):
    """Extracts repository names and descriptions from a GitHub profile"""
    
    if not github_url:
        return "No GitHub profile found."

    try:
        response = requests.get(github_url)
        if response.status_code != 200:
            return "Failed to fetch GitHub profile."

        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract repository names
        repo_list = []
        for repo in soup.select('h3 a[itemprop="name codeRepository"]'):
            repo_name = repo.text.strip()
            repo_list.append(repo_name)

        if not repo_list:
            return "No repositories found."

        return f"GitHub Repositories:\n" + "\n".join(repo_list)

    except Exception as e:
        return f"GitHub fetch error: {str(e)}"

def fetch_website_text(url):
    if not url or "http" not in url:
        return None
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            return f"Website Summary: {soup.title.text}"
    except Exception as e:
        return f"Error fetching website data: {str(e)}"
    return None