import React, { useState } from "react"
import { Button } from "./ui/button";
import axios from "axios";
import avatar from "../assets/avatars/default.png"
import loader from "../assets/loader.gif"

const SERVER_URL = import.meta.env.VITE_API_URL;

interface Message {
  text: string,
  sender: string
}

export default function TextGeneration(){
    const [messages, setMessages] = useState<Message[]>([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const message = {
                text: prompt,
                sender: "user"
            }
            setMessages((prevMessages) => [...prevMessages, message]);
            setPrompt('');
            const response = await axios.get(`${SERVER_URL}/api/ai/generateText`, {
                params: {
                    prompt: prompt
                }
            });
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
        <div className="w-full h-screen hide-scrollbar">
            <div className="w-full h-[90%] flex items-start justify-center overflow-auto hide-scrollbar">
          <div className="w-[60%] px-20 space-y-10 mt-5">
            {messages.length >0 ? (
                <div>
                    {messages.map((msg,index) => (
              <div key={index} className="">
              {msg.sender == "ai" ? (
                <div className={`w-full flex items-center justify-start gap-3`}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmeTVc-GsWj0EGmQqTPKPV2X-gqkKK3Cc1DQ&s"
                  alt=""
                  className="w-12 rounded-full shadow-xs border border-neutral-200 cursor-pointer"
                />
                <pre className="text-sm font-medium whitespace-pre-wrap">
                 {msg.text}
                </pre>
              </div>
              ) : (
                <div className={`w-full flex items-center justify-end gap-3 mb-5`}>
                <span className="text-sm font-medium">
                 {msg.text}
                </span>
                <img
                  src={avatar}
                  alt=""
                  className="w-10 rounded-full cursor-pointer"
                />
              </div>
              )}
              
            </div>
            ))}
                </div>
            ) : (
                <div className="w-full mt-[18%] flex flex-col items-center justify-center space-y-3">
                    <img
                  src={loader}
                  alt=""
                  className="w-96 rounded-full shadow-xs border border-neutral-200 cursor-pointer"
                />
                    <h3 className="text-2xl font-semibold text-slate-800 mt-5">How Can I Help you Today?</h3>
                    <p className="text-center mt-2 text-xs text-gray-500">Ready to assist you with anything you need? From answering questions, generation <br /> to providing recommendations. Let's get started.</p>
                </div>
            )}
            
          </div>
          <form onSubmit={handleSendMessage} className="w-[80%] flex items-center justify-center gap-5 fixed bottom-5 px-10">
            <div className=" bg-white px-6 py-2.5 rounded-lg shadow-sm border-2 border-neutral-200 w-[50%]">
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