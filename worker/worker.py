import redis
import json
import os
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Redis connection parameters
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_QUEUE = os.getenv("REDIS_QUEUE", "job_queue")

# Initialize Redis client
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
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
        # _, job_data = redis_client.blpop(REDIS_QUEUE)
        # job = json.loads(job_data)

        # For this example, we will use a static prompt
        prompt = "Provide an interview question related to data engineering with a focus on database management."

        # Call Gemini to generate the response
        generated_text = generate_text(prompt)

        # Print the generated question
        print(f"Generated question (Gemini): {generated_text}")

        # For testing purposes, break after the first job
        break
    except Exception as e:
        print("Error:", e)
        break




# import redis
# import json
# from tasks import process_job
# from dotenv import load_dotenv
# import json 
# import os

# load_dotenv()

# REDIS_HOST = os.getenv("REDIS_HOST", "redis")
# REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
# REDIS_QUEUE = os.getenv("REDIS_QUEUE", "job_queue")

# redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# print("Worker created :::: ")

# while True:
#     try:
#         _, job_data = redis_client.blpop(REDIS_QUEUE)
#         job = json.loads(job_data)
#         process_job(job)
#     except Exception as e:
#         print(e)


# import redis
# import json
# from transformers import AutoModelForCausalLM, AutoTokenizer
# from dotenv import load_dotenv
# import os
# import torch
# from huggingface_hub import login


# # Load environment variables
# load_dotenv()

# # Redis connection parameters
# REDIS_HOST = os.getenv("REDIS_HOST", "redis")
# REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
# REDIS_QUEUE = os.getenv("REDIS_QUEUE", "job_queue")

# login(token=os.getenv("HUGGINGFACE_API_TOKEN","")) # Replace with your actual token


# # Initialize Redis client
# redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# # Load Gemma 2 7B model and tokenizer from Hugging Face
# model_name = "google/gemma-2b"  # You can also try "google/gemma-2b" for an even lighter version
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# # Check if GPU is available on Mac using PyTorch
# device = torch.device("mps" if torch.has_mps else "cpu")  # mps is the Metal API for macOS

# # Load the model to the available device (GPU if possible)
# model = AutoModelForCausalLM.from_pretrained(model_name).to(device)

# # Function to generate text from the model
# def generate_text(prompt: str) -> str:
#     # Tokenize the input prompt and generate text from the model
#     inputs = tokenizer(prompt, return_tensors="pt").to(device)  # Move inputs to GPU if available
#     outputs = model.generate(inputs["input_ids"], max_length=100, num_return_sequences=1, do_sample=True)

#     # Decode the output and return the generated text
#     generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     return generated_text

# print("Worker created ::::")

# # Start processing the Redis queue
# while True:
#     try:
#         # Read job from Redis queue (Uncomment this when using Redis)
#         # _, job_data = redis_client.blpop(REDIS_QUEUE)
#         # job = json.loads(job_data)

#         # For this example, we will use a static prompt
#         prompt = "Provide an interview question related to data engineering with a focus on database management."

#         # Call Gemma 2 to generate the response
#         generated_text = generate_text(prompt)

#         # Print the generated question
#         print(f"Generated question: {generated_text}")

#         # For testing purposes, break after the first job
#         break
#     except Exception as e:
#         print("Error:", e)
#         break