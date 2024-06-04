import React from "react";
import Chat from "./Chat";
import ChatNavbar from "./ChatNavbar";

export default function ChatWindow() {

    return (   
        <div className="drawer" >
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">AI Assistant</label>
            </div>
            <div className="drawer-side" >
                <label htmlFor="my-drawer" aria-label="Close Assistant" className="drawer-overlay">
                </label>
                <div data-theme="light" className="menu w-80 min-h-full bg-base-200 text-base-content">
                <ChatNavbar/>
                <Chat />
                </div>
            </div>
        </div>
    )
}