# Chatbot-Component
This is a chatbot component designed to be used in nextjs projects.  It is powered by OpenAI's GPT-3.5 model.  It also uses Flask as a backend server to handle the API requests to OpenAI.

## Running the Project
To run the project, you will need two .env files.  One in the backend folder and one in the frontend folder.  The .env files should contain the variables listed in the .env.example files in each folder.  Replace any placeholder values with your own values.
Next, you will need to install the dependencies for the backend and frontend servers.  To do this, open a terminal window and run the following commands to start the backend server:
```
cd backend
pip install -r requirements.txt
flask run
```
Then, open a new terminal window and run the following commands to start the frontend server:
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
