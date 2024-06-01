import React, {useState} from "react";
import axios from "axios";

export default function Chat () {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const submitMessage = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await axios.post('/api/chat', { prompt: input });
            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error('Error fetching data from OpenAI API', error);
            setError('Error fetching data from OpenAI API');
            }
          };
    return (
        <div>
            <form onSubmit={submitMessage}>
                <input type="text" value={input} onChange={handleInputChange}/>
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Response:</h2>
                {error ? <p style={{color: 'red'}}>{error}</p> : <p>{response}</p>}
            </div>
        </div>
    );
}