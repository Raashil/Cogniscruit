import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

# Load API tokens from .env
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
LINKEDIN_TOKEN = os.getenv("LINKEDIN_TOKEN")  # Placeholder

# GitHub API Fetcher
def fetch_github_data(github_url):
    if not github_url or "github.com" not in github_url:
        return {"error": "Invalid GitHub URL"}

    username = github_url.strip("/").split("/")[-1]
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    try:
        response = requests.get(f"https://api.github.com/users/{username}/repos", headers=headers)
        if response.status_code != 200:
            return {"error": f"GitHub API Error: Status Code {response.status_code}"}

        repos = response.json()
        return [{"name": repo.get("name"), "description": repo.get("description")} for repo in repos]

    except Exception as e:
        return {"error": f"GitHub API exception: {str(e)}"}


# LinkedIn Public Profile Scraper

# LinkedIn Public Profile Scraper using Playwright
def fetch_linkedin_data(linkedin_url):
    if not linkedin_url or "linkedin.com/in/" not in linkedin_url:
        return {"error": "Invalid LinkedIn URL"}

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ))
            page = context.new_page()
            page.goto(linkedin_url, timeout=10000)

            title = page.title()
            description = page.locator("meta[name='description']").get_attribute("content")

            browser.close()

            return {
                "title": title.strip() if title else "No Title Found",
                "description": description.strip() if description else "No Description Found"
            }

    except Exception as e:
        return {"error": f"LinkedIn Playwright scraping error: {str(e)}"}




# ---------------------
# Website Metadata Scraper
# ---------------------
def fetch_website_metadata(url):
    if not url or not url.startswith("http"):
        return {"error": "Invalid website URL"}

    try:
        response = requests.get(url, timeout=5, headers={"User-Agent": "Mozilla/5.0"})
        if response.status_code != 200:
            return {"error": f"HTTP Error {response.status_code} for {url}"}

        soup = BeautifulSoup(response.text, "html.parser")
        title = soup.title.text.strip() if soup.title else "No Title Found"
        description = soup.find("meta", attrs={"name": "description"})
        keywords = soup.find("meta", attrs={"name": "keywords"})

        return {
            "title": title,
            "description": description.get("content", "No Description Found") if description else "No Description Found",
            "keywords": keywords.get("content", "No Keywords Found") if keywords else "No Keywords Found"
        }

    except Exception as e:
        return {"error": f"Website scraping error: {str(e)}"}

# Manual Test Block
if __name__ == "__main__":
    print("Running fetch_profile_data.py test...\n")

    github_url = "https://github.com/octocat"
    linkedin_url = "https://www.linkedin.com/in/sampleprofile/"
    website_url = "https://example.com"

    print("GitHub Data:")
    print(fetch_github_data(github_url), "\n")

    print("LinkedIn Data:")
    print(fetch_linkedin_data(linkedin_url), "\n")

    print("Website Metadata:")
    print(fetch_website_metadata(website_url), "\n")