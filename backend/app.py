from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

# Get CORS origins from environment variable
cors_origins = os.getenv('CORS_ORIGINS', '*')  # Default to allow all origins

# Apply CORS to your app
CORS(app, resources={r"/*": {"origins": cors_origins}})

@app.route('/')
def hello():
    return jsonify({'message': 'Hello, World'})

@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)