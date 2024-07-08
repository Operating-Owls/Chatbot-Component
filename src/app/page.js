"use client";
import ChatWindow from "./components/chatbot/ChatWindow";
import ChatButton from "./components/chatbot/ChatButton";

export default function Home() {

    return (
        <main>
            <ChatButton side="left">Hello world</ChatButton>
            <ChatWindow side="left" />
        </main>
    );
}
