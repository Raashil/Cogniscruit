from pymongo import MongoClient
from .config import MONGO_URI
from datetime import datetime,timezone

client = MongoClient(MONGO_URI)
db = client["interviewgen"]
jobs_collection = db["user_job_data"]

def check_user_present(email):
    user = jobs_collection.find_one({"email": email})
    if not user:
        return False
    else:
        return True


def create_user_entity(user_info):
    
    user = jobs_collection.find_one({"email": user_info['email']})

    if not user:
        jobs_collection.insert_one({
              
            'user_id': user_info['user_id'],
            'email': user_info['email'],
            'name': user_info['name'],
            'jobs' : [

            ]
        
            })
        
def add_a_job_to_mongo(job_id, email,github_data, linkedin_data,job_description):
    jobs_collection.update_one(
            {
                "email": email
            },
            {
                "$push": {
                    "jobs": {
                        "$each": [
                            {
                                "job_id": job_id,
                                "github_link": github_data,
                                "linkedin_link": linkedin_data,
                                "job_description": job_description,
                                "status": "Waiting",
                                "behavioural": "Not Processed",
                                "technical": "Not Processed",
                                "created_at": datetime.now(timezone.utc)
 
                            }
                            ],
                        "$position": 0
                    }
                }
            }
        )
    
def get_all_jobs_for_user(email):
    user = jobs_collection.find_one({"email": email}, {"_id": 0, "jobs": 1})
    return user
