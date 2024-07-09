"use client";
import ChatWindow from "./components/chatbot/ChatWindow";
import ChatButton from "./components/chatbot/ChatButton";
import Hero from "./components/Hero";

export default function Home() {

    return (
        <main>
            <Hero />
            <ChatButton side="left">Open Chatbot</ChatButton>
            <ChatWindow side="left" />
        </main>
    );
}
