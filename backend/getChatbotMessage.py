from openai import OpenAI
import os
from dotenv import load_dotenv
from systemPrompt import prompt
# Load the environment variables from .env file
load_dotenv()

# Get the API key from the environment variables
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("Please set the OPENAI_API_KEY environment variable.")
    exit(1)
# Create an OpenAI client
client = OpenAI(api_key=api_key)

def getChatbotMessage(chat_log):
    # prepend the prompt to the chat log
    chat_log = [prompt] + chat_log
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=chat_log
    )
    assistant_response = response.choices[0].message.content
    return assistant_response.strip("\n").strip()

if __name__ == "__main__":
    print("Welcome to ChatGPT! Ask anything or type 'quit' to exit.")
    chat_log = []
    while True:
        user_message = input()
        if user_message.lower() == "quit":
            break
        else:
            chat_log.append({"role": "user", "content": user_message})
            response = getChatbotMessage(chat_log)
            print("ChatGPT:", response)

            chat_log.append({"role": "assistant", "content": response})