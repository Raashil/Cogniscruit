import redis
import json
import os
from google import genai
from dotenv import load_dotenv
from task import generate_prompt
from mongo_service import update_job_status,update_job_fields
from config import REDIS_HOST,REDIS_PORT,REDIS_QUEUE,GEMINI_API_KEY
import re


# Initialize Redis client
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# Configure Gemini API

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

client = genai.Client(api_key=GEMINI_API_KEY)

# Function to generate text using Gemini
def generate_text(prompt: str) -> str:
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        print(response.text)
        return response.text
    except Exception as e:
        print(f"Error generating text with Gemini: {e}")
        return ""

print("Worker created ::::")

# Start processing the Redis queue
while True:
    try:
        # Read job from Redis queue (Uncomment this when using Redis)
        _, job_data = redis_client.blpop(REDIS_QUEUE)
        job = json.loads(job_data)
        print(job)

        update_job_status(job['email'], job['job_id'], "InProgress")

        # For this example, we will use a static prompt
        # prompt = "Provide an interview question related to data engineering with a focus on database management."

        # # Call Gemini to generate the response
        behavioural_prompt,technical_prompt = generate_prompt(job)

        print(behavioural_prompt,technical_prompt)

        behavioural_questions = re.findall(r"^\d+\.\s+(.*)$", generate_text(behavioural_prompt), re.MULTILINE)
        technical_questions = re.findall(r"^\d+\.\s+(.*)$", generate_text(technical_prompt), re.MULTILINE)

        # return [q.strip() for q in questions]
        behavioural_questions = [q.strip() for q in behavioural_questions]
        technical_questions = [q.strip() for q in technical_questions]

        # generate_answer="bcjbdjcbdsjc"
        # #generate_answer = generate_text(prompt)
        
        # # Print the generated question
        print(f"Generated behavioural question (Gemini): {behavioural_questions}")
        print(f"Generated behavioural question (Gemini): {technical_questions}")


        update_job_fields(job['email'], job['job_id'] ,"Completed", behavioural_questions, technical_questions)


        # For testing purposes, break after the first job
  
    except Exception as e:
        print("Error:", e)

