import { images } from "./images";

export interface Template {
    id: number,
    title: string,
    image: string;
    link: string;
}

const Ai_Templates:Template[] = [
    {
        id: 1,
        title: "AI Email Generator",
        image: images.email_template,
        link: '/dashboard/ai-email-writer'
    },
    {
        id: 2,
        title: "AI PDF Summarizer",
        image: images.resume_template,
        link: '/dashboard/ai-pdf-summarizer'
    },
    {
        id: 3,
        title: "AI Blog Generator",
        image: images.blog_template,
        link: '/dashboard/ai-blog-writer'
    },
    {
        id: 4,
        title: "AI Social Media Caption Generator",
        image: images.social_media_template,
        link: '/dashboard/ai-social-media-caption-generator'
    },
    
]

export default Ai_Templates;