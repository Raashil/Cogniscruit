from flask import Blueprint, request, jsonify
import uuid
from .github_service import get_github_data
from .linkedin_service import get_linkedin_data
from .redis_queue import push_to_queue

routes = Blueprint('routes', __name__)

@routes.route('/interview_gen_task', methods=['POST'])
def create_interview_gen_task():
    """Creates a new interview generation task and adds it to Redis."""
    try:
        data = request.get_json()
        if not data or 'github_username' not in data or 'linkedin_url' not in data:
            return jsonify({"error": "Both github_username and linkedin_url are required"}), 400

        username = data['github_username']
        linkedin_url = data['linkedin_url']

        github_data = get_github_data(username)
        linkedin_data = get_linkedin_data(linkedin_url)

        job_id = str(uuid.uuid4())
        push_to_queue(job_id, github_data, linkedin_data)

        return jsonify({"job_id": job_id})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500
