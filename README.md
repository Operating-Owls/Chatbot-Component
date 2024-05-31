# Chatbot-Component
This is a chatbot component designed to be used in nextjs projects.  It is powered by OpenAI's GPT-3.5 model.  It also uses Flask as a backend server to handle the API requests to OpenAI.

## Running the project
To run the project, you will need to have a `.env` file in the root directory of the project.  This file should contain the variables found in the `.env.example` file.  Ensure you replace the OPENAI_API_KEY variable with your own OpenAI API key.  Once you have the `.env` file set up, you can start the backend server by running the following commands:
```
cd backend
pip install -r requirements.txt
flask run
```
Then, return to the root directory of the project and run the following commands:
```
cd frontend
npm install
npm run dev
```
This will start the frontend server and you can view the project by going to `http://localhost:3000` in your browser.

## Overview
The goal of this project is to create a chatbot component that can be easily integrated into any nextjs project. The focus is to create a developer-friendly component that can be easily customized and styled to fit the needs of any website.  A benefit of this project is the reduction of customer service costs and the ability to provide much faster and more accessible responses to customers, within the site itself.

## Minimum Viable Product
At minimum:
- The chatbot should have a quality user interface that is customizable and easy to use.
- The chatbot should include a quick and easy fine tuning process, allowing developers to easily customize the it to fit the needs of their website.
- The API should provide rate limiting and a high level of security to prevent abuse.

## OpenAI Pricing Evaluation
GPT-3.5 is an inexpensive model and supports the function of chat applications. One token is roughly 4 characters for standard English text. With $10 funded into the account, testing is covered for over hundreds of thousands of words.

## Past Work
This project is a continuation of [ServiceAI](https://github.com/emilych7/serviceai), and [Next Components BVT](https://github.com/BSchoolland/next-components-bvt) 
