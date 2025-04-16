import React, { useState } from "react";
import { Copy, File, Star, ThumbsDown, ThumbsUp, XIcon } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { images } from "../constants/images";
import { ClipLoader } from "react-spinners";

const SERVER_URL = import.meta.env.VITE_API_URL;

interface Result {
  result: string;
}

export default function AiCaptionGenerator() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateEmail = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/api/ai/generateCaption`, {
        params: {
          prompt: prompt,
          platform: platform
        },
      });
      setResults((prevResults) => [...prevResults, response.data]);
      setPrompt("");
      setPlatform("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleClearInputs = async () => {
    setPrompt("");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[20%]"></div>
      <div className="w-[40%] border">
        <div className="w-[40%] flex flex-col items-start justify-center px-4 py-3 fixed top-0 bg-white border-r z-10 border">
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCrUVtcc2GX4oUEvcWchBgFwcRs1JdJaTYPw&s"
              alt=""
              className="w-10"
            />
            <div>
              <h3 className="text-sm font-medium">AI Caption Generator</h3>
              <p className="text-xs text-gray-500">
                Generate engaging and eyecatching captions with AI.
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
                <h4 className="text-xs">What is your post about?</h4>
                <span className="text-xs text-gray-500">
                  {prompt.length}/400
                </span>
              </div>
              <div className="w-full mt-3">
                <textarea
                  className="w-full h-60 border outline-none resize-none rounded-2xl p-5 text-xs"
                  placeholder="About your post..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={400}
                ></textarea>
              </div>
            </div>
            <div className="w-full p-4 bg-white rounded-xl mt-3 shadow-xs border ">
              <select onChange={(e) => setPlatform(e.target.value)} className="text-xs cursor-pointer w-full outline-none">
                <option value="">-- Choose Social Media platform --</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
                <option value="tiktok">TikTok</option>
                <option value="threads">Threads</option>
                <option value="pinterest">Pinterest</option>
              </select>
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
              {loading ? (
                <Button className="flex items-center justify-center gap-1 bg-violet-600 px-20 py-2 rounded-md cursor-pointer shadow-sm hover:bg-violet-500">
                  <ClipLoader size={15} color="#fff" />
                </Button>
              ) : (
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
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="w-[40%]">
        <div className="w-full flex items-center justify-start gap-10 p-5 border fixed top-0 bg-white">
          <h4 className="text-sm text-violet-600 cursor-pointer">Outputs</h4>
          <h4 className="text-sm text-gray-500 cursor-pointer">History</h4>
        </div>
        <div className=" space-y-5 mt-20 mb-10 px-5">
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
      </div>
    </div>
  );
}
