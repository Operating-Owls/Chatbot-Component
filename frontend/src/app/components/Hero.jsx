import React from "react";
import ChatWindow from "./ChatWindow";
import ComponentsButton from "./ComponentsButton";

export default function Hero() {
    return (
        <div className="hero p-40 bg-primary">
            <div className="hero-content text-center text-accent-content">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Meet Your ChatBot</h1>
                <p className="mb-5">Try our ChatBot using OpenAI's GPT-3.5-Turbo model; the fastest and most inexpensive method for understanding and generating natural language. </p>
                <div className="flex justify-center space-x-4">
                        <div>
                            <ChatWindow />
                        </div>
                        <ComponentsButton />
                    </div>
                </div>
            </div>
        </div>
    )
}