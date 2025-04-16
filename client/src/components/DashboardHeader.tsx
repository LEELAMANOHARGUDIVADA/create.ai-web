import { Bell, Heart } from "lucide-react";
import avatar from "../assets/avatars/default.png"

export default function DashboardHeader() {
    const username = localStorage.getItem("username");
    
    return (
        <div className="w-[80%] fixed top-0 bg-white h-14 border-b border-neutral-200 flex items-center justify-between px-5 ">
           <div>
           {username ?  <h2 className="text-md font-medium">Welcome Back, {username}<span className="text-xl">👋</span></h2> : 
            <h2 className="text-md font-medium">Welcome Back,👋</h2>}
           </div>

           <div className="flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-5">
                <Heart size={18} className="cursor-pointer" />
                <Bell size={18} className="cursor-pointer" />
            </div>
            <img src={avatar} alt="" className="w-8 rounded-full cursor-pointer" />
           </div>
        </div>
    );
}