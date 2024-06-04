import React, {useState} from "react";
import axios from "axios";
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
        try {
            const result = await axios.post('https://api.openai.com/v1/chat/completions', { 
                    model: 'gpt-3.5-turbo',
                    messages: [{role: 'user', content: input }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: process.env.OPENAI_API_KEY,
                    },
                }
            );
            setResponse(result.data.choices[0].text);
            botMessage(result.data.choices[0].message.content)
            setMessageArray((prevMessageArray) => [...prevMessageArray, botMessage])
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