import os
import json
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.json_util import dumps
from bson import ObjectId

# Load environment variables from .env file
load_dotenv()

# MongoDB configuration
MONGODB_URI = os.getenv("MONGODB_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "cogniscruit_db")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME", "interview_questions")

# Establish MongoDB connection
client = MongoClient(MONGODB_URI)
db = client[MONGO_DB_NAME]
collection = db[MONGO_COLLECTION_NAME]

def get_mongo_collection():
    """
    Return the MongoDB collection object.
    """
    return collection

def store_questions(payload: dict):
    """
    Store the final generated questions and metadata into MongoDB.
    Only saves the essential fields: generated_questions, source, model, timestamp.

    Args:
        payload (dict): The original data including resume_text, job_description, etc.
    """
    document = {
        "generated_questions": payload.get("generated_questions"),
        "source": "resume + job_description + github + linkedin + website",
        "model": payload.get("model", "mistral"),  # Default to 'mistral' if not provided
        "timestamp": datetime.utcnow().isoformat()
    }

    result = collection.insert_one(document)
    print("[MongoDB] Stored with ID:", result.inserted_id)
    print(dumps(document, indent=2, ensure_ascii=False))

def get_all_questions():
    """
    Retrieve all stored question entries (without _id).
    """
    return list(collection.find({}, {"_id": 0}))

def append_followup(record_id: str, style: str, subtopic: str, questions: list):
    """
    Appends follow-up questions to an existing interview record in MongoDB.

    Args:
        record_id (str): ID of the base interview question document
        style (str): Follow-up question style (e.g., coding, behavioral)
        subtopic (str): Follow-up subtopic
        questions (list): List of generated follow-up questions
    """
    if not record_id:
        print("[MongoDB] No record_id provided. Skipping follow-up storage.")
        return

    followup_entry = {
        "style": style,
        "subtopic": subtopic,
        "questions": questions,
        "timestamp": datetime.utcnow().isoformat()
    }

    result = collection.update_one(
        {"_id": ObjectId(record_id)},
        {"$push": {"followup_questions": followup_entry}}
    )

    if result.modified_count == 1:
        print(f"[MongoDB] Follow-up questions added to record {record_id}")
    else:
        print(f"[MongoDB] Failed to append follow-up to record {record_id}")

if __name__ == "__main__":
    # Sample test entry
    sample_data = {
        "generated_questions": [
            "Q1: Tell me about your Python experience.",
            "Q2: What is LangChain?"
        ],
        "model": "gpt-4"
    }
    store_questions(sample_data)

    print("\All stored questions:")
    print(json.dumps(get_all_questions(), indent=2, ensure_ascii=False))

    