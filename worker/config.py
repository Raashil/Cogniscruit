import os
from dotenv import load_dotenv

load_dotenv()


REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_QUEUE = os.getenv("REDIS_QUEUE", "job_queue")


MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
