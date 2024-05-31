"use client";
import { useEffect, useState } from "react";

export default function Home() {
    // api request to get data
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(apiUrl + "/api/data")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl font-bold">Welcome to the home page</h1>
            <p className="text-2xl">{data ? data.message : "Loading..."}</p>
        </main>
    );
}
