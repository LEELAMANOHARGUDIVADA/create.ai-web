import { FormEvent, useEffect, useState } from "react";
import { GoQuestion } from "react-icons/go";
import { Copy, File, Star, ThumbsDown, ThumbsUp, XIcon } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { images } from "../constants/images";
import { ClipLoader } from "react-spinners";

const SERVER_URL = import.meta.env.VITE_API_URL;

interface Result {
  result: string;
}

export default function AiEmailWriter() {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeResults, setActiveResults] = useState("Outputs");
  const token = localStorage.getItem("token");

  const handleGenerateEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/api/ai/generateEmail`, {
        params: {
          prompt: prompt,
          keywords: keywords,
          tone: tone,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResults((prevResults) => [...prevResults, response.data]);
      setPrompt("");
      setKeywords("");
      setTone("");
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const handleClearInputs = async () => {
    setPrompt("");
    setKeywords("");
    setTone("");
  };

  const getEmailHistory = async() => {
    setActiveResults("History")
    try {
      const response = await axios.get(`${SERVER_URL}/api/ai/emailHistory`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data);
      setHistory(response.data.history);
    } catch (error) {
      console.log(error.response.data);
    }
  }


  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[20%]"></div>
      <div className="w-[50%] relative border">
        <div className="w-[50%] flex flex-col items-start justify-center px-4 py-3 border-b fixed top-0 bg-white border-r">
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
              alt=""
              className="w-8"
            />
            <div>
              <h3 className="text-sm font-medium">AI Email Generator</h3>
              <p className="text-xs text-gray-500">
                Generate professional emails for your day-to-day life.
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleGenerateEmail}
          className="bg-neutral-100 h-screen"
        >
          <div className="p-6">
            <div className="w-full p-4 bg-white rounded-xl mt-16 shadow-xs border ">
              <div className="flex items-center justify-between">
                <h4 className="text-xs">What is your email about?</h4>
                <span className="text-xs text-gray-500">
                  {prompt.length}/400
                </span>
              </div>
              <div className="w-full mt-3">
                <textarea
                  className="w-full h-60 border outline-none resize-none rounded-2xl p-5 text-xs"
                  placeholder="Write an email to my project guide asking for project deadline extension"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={400}
                ></textarea>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-1">
                    <h4 className="text-xs">Keywords to include</h4>
                    <GoQuestion size={15} className="text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-500">
                    {keywords.length}/100
                  </span>
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    className="outline-none w-full border rounded-md py-3 px-4 text-xs"
                    placeholder="Request, Extension"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-1">
                    <h4 className="text-xs">Tone of voice</h4>
                    <GoQuestion size={15} className="text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-500">
                    {tone.length}/100
                  </span>
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    className="outline-none w-full border rounded-md py-3 px-4 text-xs"
                    placeholder="Informative, Professional, Requesting"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 w-[50%] bg-white h-16 z-10 p-2 border-t border-r flex items-center justify-between px-4">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center justify-center gap-1 cursor-pointer"
                onClick={handleClearInputs}
              >
                <XIcon size={18} className="text-gray-500" />
                <h4 className="text-sm">Clear All Inputs</h4>
              </div>
            </div>
            <div>
              {loading ? (
                <Button className="flex items-center justify-center gap-1 bg-violet-600 px-20 py-2 rounded-md cursor-pointer shadow-sm hover:bg-violet-500"
                >
                  <ClipLoader size={15} color="#fff" />
                </Button>
              ) : (
                <Button type="submit" className="flex items-center justify-center gap-1 bg-violet-600 px-5 py-2 rounded-md cursor-pointer shadow-sm hover:bg-violet-500"
                >
                  <span className="text-xs text-white">Generate</span>
                  <div className="flex items-center justify-center">
                    <span className="text-white text-xs font-medium">20</span>
                    <img src={images.stars} alt="" className="w-5 text-white" />
                  </div>
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="w-[30%] h-screen">
        <div className="w-full flex items-center justify-start gap-10 p-5 border fixed top-0">
          <button onClick={() => setActiveResults("Outputs")} className={`text-sm ${activeResults === "Outputs" ? "text-violet-800" : "text-gray-500"}   cursor-pointer`}>Outputs</button>
          <button onClick={getEmailHistory} className={`text-sm ${activeResults === "History" ? "text-violet-800" : "text-gray-500"} cursor-pointer`}>History</button>
        </div>
        <div className="mt-16 px-5 space-y-3.5">
          {activeResults === "Outputs" ? (
            <div>
              {results &&
            results
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  <pre className="text-sm whitespace-pre-wrap">{item.result}</pre>
                  <div className="flex items-center justify-start gap-2.5 mt-2.5">
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <Star size={15} className="text-gray-400" />
                    </div>
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <Copy size={15} className="text-gray-400" />
                    </div>
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <File size={15} className="text-gray-400" />
                    </div>
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <div className="flex items-center justify-center gap-2.5">
                        <ThumbsUp size={15} className="text-gray-400" />
                        <ThumbsDown size={15} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {history &&
            history
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  <pre className="text-sm whitespace-pre-wrap">{item.email}</pre>
                  <div className="flex items-center justify-start gap-2.5 mt-2.5">
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <Star size={15} className="text-gray-400" />
                    </div>
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <Copy size={15} className="text-gray-400" />
                    </div>
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <File size={15} className="text-gray-400" />
                    </div>
                    <div className="border p-1.5 rounded-md cursor-pointer">
                      <div className="flex items-center justify-center gap-2.5">
                        <ThumbsUp size={15} className="text-gray-400" />
                        <ThumbsDown size={15} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
