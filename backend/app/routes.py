from flask import Blueprint, request, jsonify
import uuid
from .github_service import get_github_data
from .linkedin_service import get_linkedin_data
from .redis_queue import push_to_queue
from .google_service import verify_google_token

from .mongo_service import create_user_entity,add_a_job_to_mongo,get_all_jobs_for_user

routes = Blueprint('routes', __name__)


@routes.route('/interview_gen_task', methods=['POST'])
def create_interview_gen_task():
    """Creates a new interview generation task and adds it to Redis."""

    # auth_header = request.headers.get('Authorization')
    # if not auth_header or not auth_header.startswith('Bearer '):
    #     return jsonify({'message': 'Authorization header is missing or invalid'}), 401

    # id_token_str = auth_header.split('Bearer ')[1]
    # verification_result = verify_google_token(id_token_str)

    # if verification_result['verified']:
    if True:
        # Token is valid, you can now access user information
        user_info = {
            'user_id': "ghdvhs" ,#verification_result['user_id'],
            'email': "temp@gmail.com" ,#verification_result['email'],
            'name': "jksa" #verification_result['name']
        }

        create_user_entity(user_info)

        try:
            data = request.get_json()
            if not data or ('github_username' not in data) or ('linkedin_url' not in data) or ('job_description' not in data) :
                return jsonify({"error": "job_description, github_username and linkedin_url are required"}), 400

            job_description = data['job_description']
            username = data['github_username']
            linkedin_url = data['linkedin_url']

            github_data = get_github_data(username)
            linkedin_data = get_linkedin_data(linkedin_url)

            job_id = str(uuid.uuid4())
            push_to_queue(job_id, user_info['email'] ,github_data, linkedin_data,job_description)

            add_a_job_to_mongo(job_id, user_info['email'],username, linkedin_url,job_description)

            return jsonify({"job_id": job_id}),200
        except Exception as e:
            return jsonify({"error": f"An error occurred: {e}"}), 500

    # else:
    #     return jsonify({'message': 'Invalid Google ID token', 'error': verification_result.get('error')}), 401
    

@routes.route('/get_user_jobs', methods=['POST'])
def get_user_job_list():
    """Return jobs of user"""

    # auth_header = request.headers.get('Authorization')
    # if not auth_header or not auth_header.startswith('Bearer '):
    #     return jsonify({'message': 'Authorization header is missing or invalid'}), 401

    # id_token_str = auth_header.split('Bearer ')[1]
    # verification_result = verify_google_token(id_token_str)

    # if verification_result['verified']:
    if True:
        # Token is valid, you can now access user information
        user_info = {
            'user_id': "ghdvhs" ,#verification_result['user_id'],
            'email': "temp@gmail.com" ,#verification_result['email'],
            'name': "jksa" #verification_result['name']
        }

        try:
            user = get_all_jobs_for_user(user_info['email'])
            if not user:
                return jsonify({"error": "User not found"}), 401

            return jsonify({"jobs": user.get("jobs", [])}), 200

           
        except Exception as e:
            return jsonify({"error": f"An error occurred: {e}"}), 500

    # else:
    #     return jsonify({'message': 'Invalid Google ID token', 'error': verification_result.get('error')}), 401