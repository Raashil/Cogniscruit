from pymongo import MongoClient
from config import MONGO_URI
from datetime import datetime

client = MongoClient(MONGO_URI)
db = client["interviewgen"]
jobs_collection = db["user_job_data"]


def update_job_status(email, job_id, new_status):
    jobs_collection.update_one(
        {
            "email": email,
        },
        {
            "$set": {
                "jobs.$[elem].status": new_status
            }
        },
        array_filters=[{"elem.job_id": job_id}]
    )

def update_job_fields(email, job_id, new_status, new_behavioural):
    jobs_collection.update_one(
        {
            "email": email
        },
        {
            "$set": {
                "jobs.$[elem].status": new_status,
                "jobs.$[elem].behavioural": new_behavioural
            }
        },
        array_filters=[{"elem.job_id": job_id}]
    )
