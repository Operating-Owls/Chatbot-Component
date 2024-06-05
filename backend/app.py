from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import os
from getChatbotMessage import getChatbotMessage
from datetime import datetime, timedelta

load_dotenv()

app = Flask(__name__)

# Get CORS origins from environment variable
cors_origins = os.getenv('CORS_ORIGINS', '*')
print(cors_origins)

# Apply CORS
CORS(app, resources={r"/*": {"origins": cors_origins}})

MESSAGE_LIMIT = 2
RESET_MINUTES=2
# store sessions
sessions = {}

def generate_session_id(request):
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    session_id = hash((user_agent, ip_address))
    return session_id


def filter_old_messages(data):
    # Define the current time
    current_time = datetime.now()
    
    # Define the time limit based on RESET_HOURS
    reset_time_limit = current_time - timedelta(minutes=RESET_MINUTES)
    
    # Filter and keep data that is newer than RESET_HOURS
    filtered_data = [message for message in data if datetime.strptime(message['time'], '%Y-%m-%d %H:%M:%S') > reset_time_limit]
    
    return filtered_data


def get_session_data(session_id):
    if session_id not in sessions:
        sessions[session_id] = []
    data = sessions[session_id]
    data = filter_old_messages(data)
    return data

def add_message(session_id, text):
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Format the current time as a string
    message = {'text': text, 'time': current_time}
    if session_id not in sessions:
        sessions[session_id] = []  # Initialize the session if it doesn't exist
    sessions[session_id].append(message)  # Add the message to the session

def set_session_data(session_id, data):
    sessions[session_id] = data

# Define the chatbot endpoint
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        session_id = generate_session_id(request)
        data = get_session_data(session_id)
        if len(data) > MESSAGE_LIMIT:
            set_session_data(session_id, data)
            return jsonify({'message': "sorry, you've used all allowed messages. Try again tomorrow"})
        
        # Get the data from the request
        data = request.get_json()
        # the message from the user
        message = data['message']
        add_message(session_id, message)
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