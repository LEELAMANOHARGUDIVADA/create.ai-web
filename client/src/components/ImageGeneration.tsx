import { FormEvent, Suspense, useState } from "react";
import { images } from "../constants/images";
import { Download } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";

interface Message {
  text: string,
  loading: boolean,
  imageUrl: string
}

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function ImageGeneration() {
  const [isGenerateButtonClicked, setIsGenerateButtonClicked] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>('');

  const handleSendMessage = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if(prompt.length <3){
        throw new Error('Invalid Prompt');
      }
      const message = {
        text: prompt,
        loading: true,
        imageUrl: ''
      }
      setMessages((prevMessages) => [...prevMessages, message]);
      setPrompt('');
      generateImage(prompt);
    } catch (error) {
      console.error(error);
    }
  }

  const generateImage = async(prompt:string) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/ai/generateImage`, {
        prompt
      });
      console.log(response.data);
      setTimeout(() => {
        fetchImage(response.data.process_id);
      },15000)
    } catch (error) {
      console.error(error);
    }
  }

  const fetchImage = async(process_id:string) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/ai/fetchImage`, {
          params: {
            process_id: process_id
          }
        });
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1
              ? { ...msg, imageUrl: response.data.imageUrl, loading: false }
              : msg
          ));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`w-full h-screen bg-white px-5${isGenerateButtonClicked ? 'py-10' : 'py-5' } flex flex-col items-center justify-start mt-10 gap-10`}>
      {isGenerateButtonClicked ? (
        <div className="w-full h-[90%] flex items-start justify-center overflow-auto hide-scrollbar">
          <div className="w-[60%] px-20 space-y-5 mt-5">
            {messages && messages.map((msg,index) => (
              <div key={index}>
              <div className="w-full flex items-center justify-start gap-3">
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocI6oq7mtnPDRNWqFhdjwZeqrQC76IE2S5uMqQQ9bR_K1JC36A=s96-c-br100-rg-mo"
                  alt=""
                  className="w-8 cursor-pointer"
                />
                <span className="text-sm font-medium">
                 {msg.text}
                </span>
              </div>

              <div className="mt-5">
                {msg.loading ? (
                  <div className="w-100 h-100 rounded-xl border flex items-center justify-center">
                    Generating...
                  </div>
                ) : (
                  <img
                  src={msg.imageUrl}
                  alt=""
                  className="w-100 h-100 rounded-xl shadow-sm cursor-pointer"
                />
                )}
                <div className="mt-3 px-2">
                  <div className="border w-32 p-1.5 rounded-md cursor-pointer flex items-center gap-2 shadow-xs">
                    <Download size={15} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Download</span>
                  </div>
                </div>
              </div>
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
            <Button
                type="submit"
                className="flex items-center justify-center gap-1 bg-violet-600 px-5 py-2 rounded-md cursor-pointer shadow-sm hover:bg-violet-500"
              >
                <span className="text-xs text-white">Generate</span>
                <div className="flex items-center justify-center">
                  <span className="text-white text-xs font-medium">40</span>
                  <img src={images.stars} alt="" className="w-5 text-white" />
                </div>
              </Button>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <div className=" flex items-center justify-center gap-1 rounded-full py-1.5 px-5 bg-white border border-neutral-200 shadow-xs mt-10">
            <h5>Best text to image generator</h5>
            <img src={images.stars} alt="Create.ai" className="w-5" />
          </div>

          <div className="flex flex-col items-center justify-center mt-5">
            <h3 className="text-5xl font-semibold">Turn text to</h3>
            <h3 className="text-4xl font-semibold mt-5">
              <span className="text-sky-600 text-5xl ">image</span>, in seconds.
            </h3>
            <p className="mt-8 font-medium text-center">
              Unleash your creativity with AI. Turn your imagination into visual
              art in seconds - <br /> just type, and watch the magic happen
            </p>
            
              <button onClick={() => setIsGenerateButtonClicked(true)} className="bg-gradient-to-r from-blue-400  to-rose-500 px-10 py-2 rounded-full text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-5">
                <h5 className="text-xs">Generate images</h5>
                <img src={images.stars} alt="Create.ai" className="w-5" />
              </button>
          </div>

          <div className="w-full flex flex-col items-start px-5 mt-80 mb-10">
            <h4 className="text-2xl font-semibold">The Community Showcase</h4>
            <h5 className="text-xs text-gray-500 mt-2">
              Browse through a collection of imaginative and visually stunning
              images generated by DALL-E AI
            </h5>
            <Suspense>
              <div className="w-full mt-10 flex items-center justify-center gap-2">
                <div className="w-full h-150 overflow-hidden rounded-2xl">
                  <img
                    src={images.bird}
                    alt=""
                    className="w-full h-full rounded-2xl object-cover shadow-sm cursor-pointer"
                  />
                </div>
                <div className="w-full h-96 flex flex-col items-center justify-center gap-2">
                  <div className="w-full h-full flex items-center gap-2">
                    <img
                      src={images.black_dog}
                      alt=""
                      className="w-full h-75 rounded-2xl object-cover shadow-sm cursor-pointer"
                    />
                    <img
                      src={images.lion_eye}
                      alt=""
                      className="w-full h-75 rounded-2xl object-cover shadow-sm cursor-pointer"
                    />
                  </div>
                  <div className="w-full h-full flex items-center gap-2">
                    <img
                      src={images.lizard}
                      alt=""
                      className="w-full h-75 rounded-2xl object-cover shadow-sm cursor-pointer"
                    />
                    <img
                      src={images.peacock}
                      alt=""
                      className="w-full h-75 rounded-2xl object-cover shadow-sm cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
