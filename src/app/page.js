"use client";
import Hero from "./components/Hero";
import ChatWindow from "./components/chatbot/ChatWindow";
import ChatButton from "./components/chatbot/ChatButton";

export default function Home() {

    return (
        <main>
            <ChatWindow />
            <ChatButton />
        </main>
    );
}
