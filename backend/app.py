from flask import Flask, jsonify
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({'message': 'Hello, World'})

if __name__ == '__main__':
    app.run(debug=True)