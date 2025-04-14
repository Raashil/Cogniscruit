# check_mongo.py

import os
import json
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Read config from .env
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGO_DB_NAME", "cogniscruit_db")
COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME", "interview_questions")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def check_generated_questions():
    """
    Print all interview questions saved in MongoDB.
    """
    documents = list(collection.find({}))
    if documents:
        print("Found generated questions in MongoDB:")
        print(json.dumps(documents, indent=2, ensure_ascii=False, default=str))
    else:
        print("No generated questions found in MongoDB collection.")

if __name__ == "__main__":
    check_generated_questions()