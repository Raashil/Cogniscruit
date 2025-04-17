from flask import Blueprint, request, jsonify
import uuid
from .github_service import get_github_data
from .linkedin_service import get_linkedin_data
from .redis_queue import push_to_queue
from .config import GOOGLE_CLIENT
from .mongo_service import create_user_entity,add_a_job_to_mongo,get_all_jobs_for_user,get_user_entity
from flask_jwt_extended import  create_access_token, get_jwt_identity, jwt_required
from google.oauth2 import id_token
from google.auth.transport import requests
import datetime


routes = Blueprint('routes', __name__)


@routes.route('/api/auth/google', methods=['POST'])
def google_auth():
    token = request.json.get('token')

    
    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT)
        
        # Check if the token is issued by Google
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            return jsonify({"error": "Wrong issuer"}), 401
        
        # Get user info
        user_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo.get('name', '')
        picture = idinfo.get('picture', '')
       

        user_info  = {
                'id': user_id,
                'email': email,
                'name': name,
                'picture': picture,
                'created_at': datetime.datetime.now().isoformat()
            }
        
        create_user_entity(user_info)
        
        
        # Create access token
        access_token = create_access_token(identity=email)

        print(access_token)
        
        return jsonify({
            'token': access_token,
            'user': user_info
        })
    
    except ValueError:
        # Invalid token
        return jsonify({"error": "Invalid token"}), 401


@routes.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_email= get_jwt_identity()
    
    # Get user from database
    user = get_user_entity(current_user_email)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.pop('_id',None)
    user.pop('jobs',None)
    
    return jsonify({
        "user": user
    })



@routes.route('/interview_gen_task', methods=['POST'])
@jwt_required()
def create_interview_gen_task():
    """Creates a new interview generation task and adds it to Redis."""

    current_user_email = get_jwt_identity()

    user = get_user_entity(current_user_email)

    if not user:
        return jsonify({"error": "User not found"}), 404

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
        push_to_queue(job_id,current_user_email ,github_data, linkedin_data,job_description)

        add_a_job_to_mongo(job_id, current_user_email,username, linkedin_url,job_description)

        return jsonify({"job_id": job_id}),200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

  
    

@routes.route('/get_user_jobs', methods=['POST'])
@jwt_required()
def get_user_job_list():
    """Return jobs of user"""

    current_user_email = get_jwt_identity()

    user = get_user_entity(current_user_email)

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    try:
        user = get_all_jobs_for_user(current_user_email)
        
        if not user:
            return jsonify({"error": "User not found"}), 401

        return jsonify({"jobs": user.get("jobs", [])}), 200

           
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500
    

