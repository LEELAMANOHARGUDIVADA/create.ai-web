import { useContext } from "react"
import AuthContext from "../context/AuthContext";
import { Bell, Heart } from "lucide-react";

export default function DashboardHeader() {
    const { user }:any = useContext(AuthContext);
    
    return (
        <div className="w-[80%] fixed top-0 bg-white h-14 border-b border-neutral-200 flex items-center justify-between px-5 ">
           <div>
           {user ?  <h2 className="text-md font-medium">Welcome Back,  Leela Manohar<span className="text-xl">👋</span></h2> : 
            <h2 className="text-md font-medium">Welcome Back,👋</h2>}
           </div>

           <div className="flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-5">
                <Heart size={18} className="cursor-pointer" />
                <Bell size={18} className="cursor-pointer" />
            </div>
            <img src="https://lh3.googleusercontent.com/a/ACg8ocI6oq7mtnPDRNWqFhdjwZeqrQC76IE2S5uMqQQ9bR_K1JC36A=s96-c-br100-rg-mo" alt="" className="w-8 cursor-pointer" />
           </div>
        </div>
    );
}