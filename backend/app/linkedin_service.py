import requests
from .config import SUPABASE_URL, SUPABASE_API_KEY

def get_linkedin_data(linkedin_url):
    """Fetches LinkedIn data via Supabase proxy."""
    try:
        headers = {
            "accept": "*/*",
            "apikey": SUPABASE_API_KEY,
            "authorization": f"Bearer {SUPABASE_API_KEY}",
            "content-type": "application/json",
        }
        response = requests.post(SUPABASE_URL, headers=headers, json={"linkedinUrl": linkedin_url})
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": f"LinkedIn API request failed: {e}"}
