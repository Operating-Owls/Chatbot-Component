from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import os
from getChatbotMessage import getChatbotMessage

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

# Get CORS origins from environment variable
cors_origins = os.getenv('CORS_ORIGINS', '*')
print(cors_origins)

# Apply CORS to your app
CORS(app, resources={r"/*": {"origins": cors_origins}})

@app.route('/')
def hello():
    print('hello world')
    return jsonify({'message': 'Hello, World'})

@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello, World!'})

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        message = data['message']
        chat_log = []
        chat_log.append({"role": "user", "content": message})
        # if there is both a chat log and a message, append the message to the chat log

        # otherwise assume the message is already in the chat log
        chatBotResponse = getChatbotMessage(chat_log)
        return jsonify({'message': chatBotResponse})
    except Exception as e:
        print("Error:", e)
        return jsonify({'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)