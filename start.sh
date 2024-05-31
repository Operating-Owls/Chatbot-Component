#!/bin/bash

# Function to clean up background processes
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
    exit 0
}

# Trap Ctrl+C (SIGINT) signal and call the cleanup function
trap cleanup SIGINT

# Start the backend server
echo "Starting backend server..."
cd backend
pip install -r requirements.txt
flask run &
BACKEND_PID=$!

# Start the frontend server
echo "Starting frontend server..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

# Wait for any process to exit
wait -n

# Cleanup any remaining processes
cleanup
