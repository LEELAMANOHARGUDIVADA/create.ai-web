import { images } from "../constants/images";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import nav_items from "../constants/nav_items";
import ActiveComponentContext from "../context/ActiveComponentContext";
import { useContext } from "react";
import avatar from "../assets/avatars/default.png"
import AuthContext from "../context/AuthContext";

export default function Sidebar() {
  const context = useContext(ActiveComponentContext);
  
  if (!context) {
    throw new Error("Sidebar must be used within an ActiveComponentProvider");
  }

  const { activeComponent, setActiveComponent } = context;
  const username = localStorage.getItem("username");

  const userContext = useContext(AuthContext);
  
  if (!userContext) {
    throw new Error("User Context not Found!");
  }

  const { credits } = userContext;


  return (
    <div
      className="w-[20%] h-screen border-r border-neutral-200 p-5 bg-white fixed 
    top-0 left-0 overflow-hidden"
    >
      <div className="w-full flex items-center justify-start">
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <img src={images.stars} alt="Create.ai" className="w-5" />
          <h2 className="text-lg font-semibold text-black">Create.ai</h2>
        </div>
      </div>

      <div className="mt-10">
        {nav_items.map((item) => (
          <div
            className={`w-full flex items-center justify-start gap-2 cursor-pointer px-4 py-3 rounded-md mb-5 ${
              activeComponent === item.component &&
              "bg-neutral-100/75 shadow-sm"
            }`}
            key={item.id}
            onClick={() => setActiveComponent(item.component)}
          >
            <item.icon size={20} className={`${activeComponent ? 'text-black' : 'text-neutral-500'}`} />
            <h5 className="font-medium text-xs">{item.name}</h5>
          </div>
        ))}
      </div>

      <div className="w-[17.5%] fixed bottom-28">
        
        <div onClick={() => setActiveComponent("Subscriptions")} className="w-full bg-white py-2 rounded-md text-xs font-medium text-violet-500 cursor-pointer border shadow-xs flex items-center justify-center gap-1">
              <span>Upgrade to Pro</span>
              <img src={images.stars} alt="" className="w-5" />
          </div>
      </div>

      <div className="w-[88%] absolute bottom-5 h-14 flex items-center justify-between p-2 gap-3 cursor-pointer rounded-lg">
        <div className="flex items-center justify-center gap-3">
          <img src={avatar} alt="" className="w-12 rounded-full" />
          <div>
            <h3 className="text-xs font-semibold">{username}</h3>
            <h4 className="text-[10px] font-medium mt-1">
              {credits} Credits
            </h4>
          </div>
        </div>
        <div>
          <HiMiniChevronUpDown size={20} />
        </div>
      </div>
    </div>
  );
}
