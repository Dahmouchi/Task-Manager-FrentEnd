import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
  
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
  
    try {
      const response = await axios.get("http://localhost:9098/ai/generate", {
        params: { message: input }
      });
  
      let aiText = response.data.generation;
  
      // Remove content inside <think> </think>
      aiText = aiText.replace(/<think>.*?<\/think>/gs, "").trim();
  
      const botMessage = { sender: "bot", text: aiText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full h-[90vh]  mx-auto bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div className="h-[80vh] overflow-y-auto border p-3 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 max-w-md rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {msg.text}
            </span>
           
          </div>
          
        ))}
         {loading && 
            <div  className={`mb-2 text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded-t-lg rounded-br-lg bg-gray-300 text-black"}`}>
               . . .
            </span>
          </div>}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow border px-3 py-2 rounded-l-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Handle Enter key
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}
