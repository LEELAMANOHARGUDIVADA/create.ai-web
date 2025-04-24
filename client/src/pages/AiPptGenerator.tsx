import React, { useState } from "react"
import { Button } from "../components/ui/button";
import { images } from "../constants/images";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PptxGenJS from "pptxgenjs";

interface OutlineSlide {
    heading: string,
    content: string,
    image_prompt: string
}

const SERVER_URL = import.meta.env.VITE_API_URL;
const UNSPLASH_API_BASE_URL = "https://api.unsplash.com";
const ACCESS_KEY = "envWeFzdEP7TZFj6NUkMrra75IUhI6axEfu2yDhsr5w";

export const unsplashApi = axios.create({
    baseURL: UNSPLASH_API_BASE_URL,
    headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
    },
});

export default function AiPptGenerator() {
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [outlineSlides, setOutlineSlides] = useState<OutlineSlide[]>([]);
    const [slideImages, setSlideImages] = useState<{ [index: number]: string }>({});
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URL}/api/ai/generatePPT`, {
                params: {
                    topic: prompt
                }
            });
            response.data.result.slides.forEach((slide: OutlineSlide, idx: number) => {
                generateImage(slide.heading, idx);
            });
            setOutlineSlides(response.data.result.slides);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const generateImage = async (prompt: string, index: number) => {
        if (prompt.length < 3) return;

        try {
            const response = await unsplashApi.get("/search/photos", {
                params: {
                    query: prompt,
                    per_page: 1,
                },
            });

            const imageUrl = response.data.results[0]?.urls?.full;
            if (imageUrl) {
                setSlideImages(prev => ({ ...prev, [index]: imageUrl }));
            }
        } catch (error) {
            console.error("Error fetching Unsplash image:", error);
        }
    };

    const generatePPT = async () => {
        try {
            setIsGenerating(true);
        } catch (error) {
            console.error(error);
            setIsGenerating(false);
        }
    }

    const exportToPPT = () => {
        const pptx = new PptxGenJS();
      
        outlineSlides.forEach((slide) => {
          const slideObj = pptx.addSlide();
          
          slideObj.addText(slide.heading, {
            x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "FFFFFF",
          });
      
          slideObj.addText(slide.content, {
            x: 0.5, y: 1.5, fontSize: 14, color: "FFFFFF",
            wrap: true,
            w: "90%",
          });
      
          if (slide.image_prompt && slide.image_prompt.length > 5) {
            slideObj.addImage({
              path: slide.image_prompt, // Must be a URL or base64
              x: 0.5,
              y: 3,
              w: 6,
              h: 3,
            });
          }
        });
      
        pptx.writeFile();
      };
      

    return (
        <div className="w-full bg-neutral-50 flex items-center justify-center p-5">
            {isGenerating ? (
                <div className="w-full flex flex-col items-center justify-center gap-10 my-10">
                    {outlineSlides.map((slide, index) => {
                        return (
                            <div key={index} className="w-[65%] h-135 bg-zinc-800 flex items-center justify-start shadow-sm gap-5 hover:shadow hover:border cursor-pointer">
                                {index % 2 == 0 ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-[60%] flex flex-col items-start justify-center gap-3 p-5">
                                            <h4 className="text-4xl font-semibold text-white">{slide.heading}</h4>
                                            <pre className="text-md text-white whitespace-pre-wrap mt-5">{slide.content}</pre>
                                        </div>
                                        <div className="h-full w-[50%]">
                                            {slideImages[index] ? (
                                                <img
                                                    src={slideImages[index]}
                                                    alt={slide.image_prompt}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ClipLoader size={15} color="#6366F1" />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        
                                        <div className="h-full w-[50%]">
                                            {slideImages[index] ? (
                                                <img
                                                    src={slideImages[index]}
                                                    alt={slide.image_prompt}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ClipLoader size={15} color="#6366F1" />
                                            )}
                                        </div>
                                        <div className="w-[60%] flex flex-col items-start justify-center gap-3 p-5">
                                            <h4 className="text-4xl font-semibold text-white">{slide.heading}</h4>
                                            <pre className="text-md text-white whitespace-pre-wrap mt-5">{slide.content}</pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="w-full flex flex-col items-center justify-start">
                    <div className="mt-10 flex flex-col items-center justify-center">
                        <h3 className="text-4xl font-semibold text-slate-800">Generate PPT</h3>
                        <p className="text-lg mt-2">What would you like to create today?</p>
                    </div>
                    <div className="mt-10 w-full">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-5">
                            <div className="bg-white px-6 py-2.5 rounded-lg shadow-xs border-2 border-neutral-200 w-[50%]">
                                <input
                                    placeholder="Describe what you'd like to generate"
                                    className="outline-none w-full text-sm h-8"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>
                            <div>
                                {prompt.length > 3 && outlineSlides.length <= 0 ? <Button type="submit"
                                    className={`flex items-center justify-center gap-1 bg-violet-500 hover:bg-violet-500/80 ${loading ? "px-20" : "px-5"} py-2 rounded-md shadow-sm cursor-pointer`}
                                >
                                    {loading ? (
                                        <ClipLoader size={15} color="#fff" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-1">
                                            <img src={images.stars} alt="" className="w-5" />
                                            <span className="text-xs text-white">Generate Outline</span>
                                        </div>
                                    )}

                                </Button> : <div></div>}
                            </div>

                        </form>
                    </div>
                    {outlineSlides.length > 0 &&
                        <div className="w-[50%] flex flex-col items-start justify-center mt-7">
                            <div className="w-full flex flex-col items-start justify-center">
                                <h4 className="ml-2">Outline</h4>
                                <div className="mt-3 w-full bg-white p-5 rounded-lg shadow-xs border border-neutral-200 space-y-5">
                                    {outlineSlides.map((slide, index) => {

                                        return (
                                            <div key={index} className="w-full h-32 flex items-center justify-start shadow-sm rounded-lg gap-5 hover:shadow hover:border cursor-pointer">
                                                <div className="bg-sky-100/90 w-[10%] h-full flex items-center justify-center rounded-l-lg">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="w-[80%] flex flex-col items-start justify-center gap-3">
                                                    <h4 className="text-xl font-medium text-slate-800">{slide.heading}</h4>
                                                    <p className="text-xs text-slate-500">{slide.content}</p>
                                                </div>
                                                <div className="h-full">
                                                    {slideImages[index] ? (
                                                        <img
                                                            src={slideImages[index]}
                                                            alt={slide.image_prompt}
                                                            className="w-32 h-full object-cover rounded-r-lg"
                                                        />
                                                    ) : (
                                                        <ClipLoader size={15} color="#6366F1" />
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-start justify-center my-5">
                                <h4 className="ml-2 text-sm">Customize your PPT</h4>
                                <div className="mt-3 w-full bg-white p-5 rounded-lg shadow-xs border border-neutral-200 space-y-5">
                                    <div>
                                        <h4 className="text-slate-800 font-medium text-lg">Themes</h4>
                                        <p className="text-sm text-slate-500 mt-1">Use one of our popular themes below</p>
                                    </div>
                                    <div className="w-full grid grid-cols-3 items-center justify-center cursor-pointer">
                                        <div className="w-full flex flex-col items-start justify-center">
                                            <div className="w-full bg-black/90 h-40 rounded-t-lg p-5">
                                                <div className="bg-zinc-800/90 h-full flex flex-col items-center justify-center gap-2 text-white">
                                                    <h5 className="text-4xl font-medium">Title</h5>
                                                    <p>Body & <span className="text-lime-300 underline">link</span></p>
                                                </div>
                                            </div>
                                            <h5 className="text-slate-500 text-sm mt-1">Fluo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 w-full flex items-center justify-center">
                                <Button onClick={generatePPT}
                                    className="flex items-center justify-center gap-1 bg-violet-500 hover:bg-violet-500/80 px-5 py-2 rounded-md shadow-sm cursor-pointer"
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        <img src={images.stars} alt="" className="w-5" />
                                        <span className="text-sm text-white">Generate</span>
                                    </div>

                                </Button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}