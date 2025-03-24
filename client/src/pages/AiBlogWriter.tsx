import { FormEvent, useState } from "react";
import { GoQuestion } from "react-icons/go";
import { PiMagicWandLight } from "react-icons/pi";
import { Copy, File, Star, ThumbsDown, ThumbsUp, XIcon } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";

const SERVER_URL = import.meta.env.VITE_API_URL;

// interface Result {
//   result: string;
// }

export default function AiBlogWriter() {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("");
  const [results, setResults] = useState([]);

  const handleGenerateEmail = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${SERVER_URL}/api/ai/generateBlog`, {
        params: {
          prompt: prompt,
          keywords: `keywords to be included: ${keywords}`,
          tone: `tone of blog: ${tone}`,
        },
      });
      setResults((prevResults) => [...prevResults, response.data]);
      setPrompt("");
      setKeywords("");
      setTone("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearInputs = async () => {
    setPrompt("");
    setKeywords("");
    setTone("");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[20%]"></div>
      <div className="w-[40%] border">
        <div className="w-[40%] flex flex-col items-start justify-center px-4 py-3 fixed top-0 bg-white border-r z-10 border">
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/986/575/non_2x/blogger-logo-blogger-logo-transparent-blogger-icon-transparent-free-free-png.png"
              alt=""
              className="w-10"
            />
            <div>
              <h3 className="text-sm font-medium">AI Blog Generator</h3>
              <p className="text-xs text-gray-500">
                Generate engaging blog content with AI.
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleGenerateEmail}
          className="bg-neutral-100 h-screen fixed top-0 w-[40%] border"
        >
          <div className="p-6">
            <div className="w-full p-4 bg-white rounded-xl mt-16 shadow-xs border ">
              <div className="flex items-center justify-between">
                <h4 className="text-xs">What is your blog about?</h4>
                <span className="text-xs text-gray-500">
                  {prompt.length}/400
                </span>
              </div>
              <div className="w-full mt-3">
                <textarea
                  className="w-full h-60 border outline-none resize-none rounded-2xl p-5 text-xs"
                  placeholder="Write a blog about top 10 technologies to learn in 2025"
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
                    placeholder="Technology, Artificial Intelligence, Blockchain"
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
                    placeholder="Informative"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 w-[40%] bg-white h-16 z-10 p-2 border-t border-r flex items-center justify-between px-4">
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
              <Button
                type="submit"
                className="flex items-center justify-center gap-2 bg-orange-500 px-5 py-2 rounded-md cursor-pointer shadow-sm hover:bg-orange-400"
              >
                <PiMagicWandLight size={20} className="text-white" />
                <span className="text-xs text-white">Generate</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-[40%]">
        <div className="w-full flex items-center justify-start gap-10 p-5 border fixed top-0 bg-white">
          <h4 className="text-sm text-orange-500 cursor-pointer">Outputs</h4>
          <h4 className="text-sm text-gray-500 cursor-pointer">History</h4>
        </div>
        <div className=" space-y-5 mt-20 mb-10 px-5">
          {results &&
            results
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  <p className="text-sm">{item.result}</p>
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
      </div>
    </div>
  );
}
