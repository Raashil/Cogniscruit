from flask import Flask,jsonify
from app.routes import routes
from app.config import JWT_SECRET_KEY
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.register_blueprint(routes)

CORS(app)

# Configure JWT
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

jwt = JWTManager(app)

# Middleware to handle authentication errors with better messages
@jwt.unauthorized_loader
def unauthorized_callback(callback):
    return jsonify({
        'error': 'Missing or invalid token',
        'message': 'Authentication required'
    }), 401

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'error': 'Token expired',
        'message': 'Token has expired, please log in again'
    }), 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050,debug=True)

