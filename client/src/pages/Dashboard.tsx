import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";
import ImageGeneration from "../components/ImageGeneration";
import { useContext } from "react";
import Settings from "../components/Settings";
import Profile from "../components/Profile";
import Home from "../components/Home";
import ActiveComponentContext from "../context/ActiveComponentContext";
import Subscriptions from "../components/Subscriptions";
import TextGeneration from "../components/TextGeneration";

export default function Dashboard() {
    const context = useContext(ActiveComponentContext);
    
      if (!context) {
        throw new Error("Dashboard must be used within an ActiveComponentProvider");
      }
    
      const { activeComponent } = context;
    return (
        <div className="w-full flex items-center justify-center hide-scrollbar">
            <div className="w-[25%]">
            <Sidebar  />
            </div>
            <div className="w-full bg-white">
                <DashboardHeader />

                <div className="w-full mt-14">
                {activeComponent === "ImageGeneration" && <ImageGeneration />}
                {activeComponent === "Profile" && <Profile />}
                {activeComponent === "Settings" && <Settings />}
                {activeComponent === "Home" && <Home />}
                {activeComponent === "Subscriptions" && <Subscriptions />}
                {activeComponent === "TextGeneration" && <TextGeneration />}
                </div>
            </div>
        </div>
    )
}