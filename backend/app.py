from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import os
from getChatbotMessage import getChatbotMessage

load_dotenv()

app = Flask(__name__)

# Get CORS origins from environment variable
cors_origins = os.getenv('CORS_ORIGINS', '*')
print(cors_origins)

# Apply CORS
CORS(app, resources={r"/*": {"origins": cors_origins}})

@app.route('/')
def hello():
    print('hello world')
    return jsonify({'message': 'Hello, World'})

@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello, World!'})

# Define the chatbot endpoint
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        # Get the data from the request
        data = request.get_json()
        # the message from the user
        message = data['message']
        # Create a chat log with the user message
        chat_log = []
        chat_log.append({"role": "user", "content": message})
        # Get the response from the chatbot
        chatBotResponse = getChatbotMessage(chat_log)
        # Return the response
        return jsonify({'message': chatBotResponse})
    except Exception as e:
        # Return an error in case of an exception
        print("Error:", e)
        return jsonify({'message': 'An unexpected error occurred.'})

if __name__ == '__main__':
    app.run(debug=True)