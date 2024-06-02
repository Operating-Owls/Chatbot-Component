import openai
import os
from dotenv import load_dotenv
# Load the environment variables from .env file
load_dotenv()

# Get the API key from the environment variables
api_key = os.getenv("OPENAI_API_KEY")

openai.api_key = api_key


chat_log = []

while True:
    user_message = input()
    if user_message.lower() == "quit":
        break
    else:
        chat_log.append({"role": "user", "content": user_message})
        response = openai.ChatCompletion(
            model="gpt-3.5-turbo",
            messages=chat_log
        )
        assistant_response = response['choices'][0]['message']['content']
        print("ChatGPT:", assistant_response.strip("\n").strip())

        chat_log.append({"role": "assistant", "content": assistant_response.strip("\n").strip()})