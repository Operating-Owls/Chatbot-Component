import React from "react";
import Chat from "./Chat";

export default function ChatBox() {

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/*contents */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">AI Assistant</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="Close Assistant" className="drawer-overlay"></label>
                <div>
                    <Chat />
                </div>
            </div>
        </div>
    )
}