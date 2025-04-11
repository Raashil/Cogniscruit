import redis
import json
from .config import REDIS_HOST, REDIS_PORT, REDIS_QUEUE

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

def push_to_queue(job_id, github_data, linkedin_data,job_description):
    """Pushes the job data to Redis queue."""
    redis_client.rpush(REDIS_QUEUE, json.dumps({"job_id": job_id, "github_data": github_data, "linkedin_data": linkedin_data , "job_description":job_description}))
