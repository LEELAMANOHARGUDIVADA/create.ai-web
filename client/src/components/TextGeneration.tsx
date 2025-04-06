import { useState } from "react"
import { Button } from "./ui/button";
import { images } from "../constants/images";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function TextGeneration(){
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async(event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const message = {
                text: prompt,
                sender: "user"
            }
            setMessages((prevMessages) => [...prevMessages, message]);
            const response = await axios.get(`${SERVER_URL}/api/ai/generateText`, {
                params: {
                    prompt: prompt
                }
            });
            setPrompt('');
            if(response){
                setMessages((prevMessages) => [...prevMessages, {
                    text: response.data.text,
                    sender: "ai"
                }]);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    return(
        <div className="w-full h-screen">
            <div className="w-full h-[90%] flex items-start justify-center overflow-auto hide-scrollbar">
          <div className="w-[60%] px-20 space-y-5 mt-5">
            {messages && messages.map((msg,index) => (
              <div key={index}>
              {msg.sender == "ai" ? (
                <div className={`w-full flex items-center justify-start gap-3`}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmeTVc-GsWj0EGmQqTPKPV2X-gqkKK3Cc1DQ&s"
                  alt=""
                  className="w-12 rounded-full shadow-xs border border-neutral-200 cursor-pointer"
                />
                <span className="text-sm font-medium">
                 {msg.text}
                </span>
              </div>
              ) : (
                <div className={`w-full flex items-center justify-end gap-3`}>
                <span className="text-sm font-medium">
                 {msg.text}
                </span>
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocI6oq7mtnPDRNWqFhdjwZeqrQC76IE2S5uMqQQ9bR_K1JC36A=s96-c-br100-rg-mo"
                  alt=""
                  className="w-8 cursor-pointer"
                />
              </div>
              )}
              
            </div>
            ))}
            
          </div>
          <form onSubmit={handleSendMessage} className="w-[80%] flex items-center justify-center gap-5 fixed bottom-5 px-10">
            <div className=" bg-white px-6 py-2.5 rounded-lg shadow-sm border w-[50%]">
              <input
                type="text"
                placeholder="Enter a prompt..."
                className="outline-none w-full text-xs"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            {loading ? (
                <Button
                className="flex items-center justify-center gap-1 bg-gray-500 px-5 py-2 rounded-md shadow-sm cursor-not-allowed"
              >
                <span className="text-xs text-white">Send</span>
                
              </Button>
            ) : (
                <Button
                type="submit"
                className="flex items-center justify-center gap-1 bg-violet-600 px-5 py-2 rounded-md cursor-pointer shadow-sm hover:bg-violet-500"
              >
                <span className="text-xs text-white">Send</span>
                
              </Button>
            )}
          </form>
        </div>
        </div>
    )
}