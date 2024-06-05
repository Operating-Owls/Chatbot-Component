import React, {useState} from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import ChatNavbar from "./ChatNavbar";
import { Autour_One } from "next/font/google";

export default function Chat () {

    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);

    const[messageArray, setMessageArray] = React.useState([])

    const handleInputChange = (e) => {
        console.log("Changed!")
        setInput(e.target.value);
    }

    function messageTime () {
        var dateWithoutSecond = new Date();
        return dateWithoutSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }

    const botMessage = (response) => (
        <BotMessage response={response} time={messageTime()} key={messageTime()}/>
    )
    const userMessage = (input) => (
        <UserMessage messageContent={input} time={messageTime()} key={messageTime()} />
    )

    const submitMessage = async (e) => {
        e.preventDefault();
        setError(null);
        setMessageArray((prevMessageArray => [...prevMessageArray, userMessage(input)]))
        console.log("User message: ", input)
        try {
            console.log("Sending message to OpenAI API")
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            
            const fetchData = async () => {
                const response = await fetch(apiUrl + "/api/chatbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({message: input})
                });
                const data = await response.json();
                console.log(data);
                const successMessage = (<BotMessage response={data.message} time={messageTime()}/>)
                setMessageArray((prevMessageArray) => [...prevMessageArray, successMessage])
            };
            fetchData();
            
        } catch (error) {
            console.error('Error fetching data from OpenAI API', error);
            const errorMessage = (<BotMessage error={"Something went wrong."} time={messageTime()}/>)
            setMessageArray((prevMessageArray) => [...prevMessageArray, errorMessage])
        }
        setInput('');
    };

    return (
        <div>
            <div className="p-1"></div>
            <div>
                {messageArray}
            </div>
            <div>
            <form className=" btm-nav" onSubmit={submitMessage}>
                <input type="text" placeholder="Type here" className="input" value={input} onChange={handleInputChange}/>
                <button>Send</button>
            </form>
            </div>
        </div>
    );
}