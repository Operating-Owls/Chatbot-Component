import React, {useState} from "react";
import axios from "axios";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import AlertMessage from "./AlertMessage";

export default function Chat () {

    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    const[messageArray, setMessageArray] = React.useState([])

    // 500 character rate limit
    const maxMessageValue = 500;
    const handleInputChange = (e) => {
        setInput(e.target.value);

        if (e.target.value.length <= maxMessageValue) {
            setInput(e.target.value);
            setError(null);
        } else {
            setError("This message is too long.")
        }
    }

    function messageTime() {
        var dateWithoutSecond = new Date();
        return dateWithoutSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }

    const userMessage = (input) => (
        <UserMessage messageContent={input} time={messageTime()} key={messageTime()} />
    )

    const submitMessage = async (e) => {
        e.preventDefault();

        if (!input.trim()) {
            setError("You cannot send an empty string.")
            return;
        }

        if (input.length > maxMessageValue) {
            setError("This message is too long.")
            return;
        }

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
        setError(null);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-1 chat--box">
                <div className="chat--box">{messageArray}</div>
                {error && (<div className="justify-self-end p-0.5"><AlertMessage errorMessage={error}/></div>)}
            </div>
            <div className="justify-self-end">
                <form className="flex flex-row join" onSubmit={submitMessage}>
                    <input placeholder="Type here..." className="input input-md w-5/6 join-item" value={input} onChange={handleInputChange}/>
                    <button className="btn btn-accent join-item">Send</button>
                </form>
            </div>
        </div>
    );
}