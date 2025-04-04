import requests
import concurrent.futures
from .config import GITHUB_API_URL, GITHUB_TOKEN

headers = {
    "Authorization": f"token {GITHUB_TOKEN}" if GITHUB_TOKEN else None,
    "Accept": "application/vnd.github.v3+json",
}

def get_readme_content(username, repo_name):
    """Fetches the content of a README file."""
    try:
        readme_url = f"{GITHUB_API_URL}/repos/{username}/{repo_name}/readme"
        response = requests.get(readme_url, headers=headers)
        response.raise_for_status()
        return requests.get(response.json().get("download_url")).text
    except requests.exceptions.RequestException:
        return None

def process_repo(username, repo):
    """Processes a single repository, fetching README if necessary."""
    description = repo.get("description") or get_readme_content(username, repo.get("name")) or "No description"
    return {
        "name": repo.get("name"),
        "description": description[:500] + "..." if len(description) > 500 else description,
        "language": repo.get("language"),
        "stargazers_count": repo.get("stargazers_count"),
        "forks_count": repo.get("forks_count"),
        "created_at": repo.get("created_at"),
        "updated_at": repo.get("updated_at"),
        "html_url": repo.get("html_url"),
        "topics": repo.get("topics", [])
    }

def get_github_data(username):
    """Fetches GitHub user data and repositories concurrently."""
    try:
        user_response = requests.get(f"{GITHUB_API_URL}/users/{username}", headers=headers)
        user_response.raise_for_status()
        user_data = user_response.json()

        repos_response = requests.get(f"{GITHUB_API_URL}/users/{username}/repos", headers=headers)
        repos_response.raise_for_status()
        repos_data = repos_response.json()

        user_info = {key: user_data.get(key) for key in ["login", "name", "bio", "location", "public_repos", "followers", "following", "created_at", "updated_at", "html_url"]}

        with concurrent.futures.ThreadPoolExecutor() as executor:
            repo_info = list(executor.map(lambda repo: process_repo(username, repo), repos_data))

        return {"user": user_info, "repositories": repo_info}

    except requests.exceptions.RequestException as e:
        return {"error": f"GitHub API request failed: {e}"}
