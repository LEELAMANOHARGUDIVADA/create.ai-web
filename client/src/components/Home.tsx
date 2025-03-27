import { Heart } from "lucide-react";
import { images } from "../constants/images";
import Ai_Templates from "../constants/ai_templates";
import TemplateCard from "./TemplateCard";
import AiTipOfTheDay from "./AiTip";
import { useContext } from "react";
import ActiveComponentContext from "../context/ActiveComponentContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { activeComponent, setActiveComponent } = useContext(ActiveComponentContext);

  return (
    <div className="w-full">
      <div
        className="w-full h-48  bg flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${images.banner})` }}
      >
        <h4 className="text-3xl font-semibold text-white">
          What would you like to create today?
        </h4>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Recent AI Creations</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="w-full h-52 bg-gray-200 rounded-lg cursor-pointer">
                <img src={images.bird} alt="" className="h-full w-full object-cover object-center rounded-lg shadow-sm" />
            </div>
            <div className="w-full h-52 bg-gray-200 rounded-lg cursor-pointer">
                <img src={images.lion_eye} alt="" className="h-full w-full object-cover object-center rounded-lg shadow-sm" />
            </div>
            <div className="w-full h-52 bg-gray-200 rounded-lg cursor-pointer">
                <img src={images.black_dog} alt="" className="h-full w-full object-cover object-center rounded-lg shadow-sm" />
            </div>
          </div>
        </div>

        <AiTipOfTheDay />
      </div>

      <div className="w-full px-6">
        <div>
            <h3 className="text-lg font-semibold">Trending Templates</h3>
            <div className="grid grid-cols-4 gap-5 my-5">
                {Ai_Templates.map((item) => (
                  <Link to={item.link} key={item.id}><TemplateCard  template={item} /></Link>
                ))}
            </div>
        </div>
      </div>

      <div className="w-full px-6 py-3">
        <div className="bg-gradient-to-r from-blue-100 to-sky-400 w-full h-52 rounded-xl shadow-sm flex items-center justify-between">
          <div className="px-10">
            <h4 className="text-2xl font-semibold">Unleash Creativity with AI-Generated Images</h4>
            <p className="text-sm font-medium mt-2">Transform your ideas into stunning visuals instantly! Whether for design, marketing, or inspiration <br /> our AI-powered image generator brings your imagination to life.</p>
            <button className="px-8 py-2 rounded-md bg-purple-600 shadow-sm text-sm text-white mt-5 cursor-pointer" onClick={() => setActiveComponent("ImageGeneration")}>Generate now</button>
          </div>
          <div className="h-full">
            <img src="https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/ba08571f-ebed-4f9e-967d-86eb54e5795c/Future_Skills-Edu_Page_Glow_Up-Feature_banner.png" alt="" className="w-full h-52 object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
