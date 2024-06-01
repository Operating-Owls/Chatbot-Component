from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def chat():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {OPENAI_API_KEY}'
            },
            json={
                'prompt': prompt,
                'max_tokens': 150,
                'temperature': 0.7
            }
        )
        
        response.raise_for_status()
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        print(f'Error fetching data from OpenAI API: {e}')
        return jsonify({'error': 'Error fetching data from OpenAI API'}), 500

app = Flask(__name__)
@app.route('/api/chat', methods=['POST']) # '/' origin
def hello():
    return 'Hello World'
if __name__ == '__main__':
    app.run()
