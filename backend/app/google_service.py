
from google.oauth2 import id_token
from google.auth.transport import requests
import os
from .config import GOOGLE_CLIENT


# Replace with your Google Client ID

def verify_google_token(id_token_str):
    """Verifies the Google ID token."""
    try:
        idinfo = id_token.verify_oauth2_token(id_token_str, requests.Request(), GOOGLE_CLIENT)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # If the token is valid, you can access user information here
        user_id = idinfo['sub']
        email = idinfo.get('email')
        name = idinfo.get('name')
        # Add other relevant claims you might need

        return {
            'user_id': user_id,
            'email': email,
            'name': name,
            'verified': True
        }
    except ValueError as e:
        # Invalid token
        print(f"Invalid Google ID token: {e}")
        return {'verified': False, 'error': str(e)}