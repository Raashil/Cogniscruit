import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_API_URL = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_QUEUE = os.getenv("REDIS_QUEUE", "job_queue")

print(REDIS_HOST,REDIS_PORT,REDIS_QUEUE)

SUPABASE_URL = "https://nabobxtdeszjezdwrlge.supabase.co/functions/v1/proxycurl-profile"
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

GOOGLE_CLIENT =  os.getenv("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_ID")
JWT_SECRET_KEY = os.getenv("JWT_SECRET", "supersecret")
