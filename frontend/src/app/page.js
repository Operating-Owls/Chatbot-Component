"use client";
import { useEffect, useState } from "react";

export default function Home() {
    // api request to get data
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(apiUrl + "/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message: "Hello, Chatbot!"})
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
        });
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl font-bold">Welcome to the home page</h1>
            <p className="text-2xl">{data ? data.message : "Loading..."}</p>
        </main>
    );
}
