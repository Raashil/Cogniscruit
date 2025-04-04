import redis
import json
from tasks import process_job
from dotenv import load_dotenv
import json 
import os

load_dotenv()

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_QUEUE = os.getenv("REDIS_QUEUE", "job_queue")

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

while True:
    _, job_data = redis_client.blpop(REDIS_QUEUE)
    job = json.loads(job_data)
    process_job(job)
