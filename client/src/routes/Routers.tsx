import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AiEmailWriter from "../pages/AiEmailWriter";
import AiBlogWriter from "../pages/AiBlogWriter";
import AiResumeBuilder from "../pages/AiResumeBuilder";
import AiCaptionGenerator from "../pages/AiCaptionGenerator";

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/ai-email-writer" element={<AiEmailWriter />} />
            <Route path="/dashboard/ai-blog-writer" element={<AiBlogWriter />} />
            <Route path="/dashboard/ai-resume-builder" element={<AiResumeBuilder />} />
            <Route path="/dashboard/ai-social-media-caption-generator" element={<AiCaptionGenerator />} />
        </Routes>
    )
}