import uuid
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env for MongoDB config
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGO_DB_NAME", "cogniscruit_db")
COLLECTION_NAME = "followup_sessions"

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
session_collection = db[COLLECTION_NAME]

def create_session(record_id: str) -> str:
    """
    Create a new interactive session with initial state.
    """
    session_id = str(uuid.uuid4())
    session_data = {
        "session_id": session_id,
        "record_id": record_id,
        "state": "waiting_for_confirmation",
        "created_at": datetime.utcnow()
    }
    session_collection.insert_one(session_data)
    print(f"[Session] Created session {session_id}")
    return session_id

def update_session(session_id: str, updates: dict) -> None:
    """
    Update session state or fields.
    """
    session_collection.update_one(
        {"session_id": session_id},
        {"$set": updates}
    )
    print(f"[Session] Updated session {session_id} with {updates}")

def get_session(session_id: str) -> dict:
    """
    Retrieve session by session_id.
    """
    return session_collection.find_one({"session_id": session_id})