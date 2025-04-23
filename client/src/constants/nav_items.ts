import { Home, Image, MessageCircle, Settings, User, Code } from "lucide-react";

export type ComponentType = "Home" | "ImageGeneration" | "TextGeneration" | "CodeRefactorer" | "Profile" | "Settings" | "Subscriptions";

interface NavItem {
  id: number;
  name: string;
  icon: React.ElementType;
  component: ComponentType;
}

const nav_items:NavItem[] = [
    {
        id: 1,
        icon: Home,
        name: 'Home',
        component: 'Home'
    },
    {
        id: 2,
        icon: MessageCircle,
        name: 'Chat with AI',
        component: 'TextGeneration'
    },
    {
        id: 3,
        icon: Image,
        name: 'Text to Image',
        component: 'ImageGeneration'
    },
    {
        id: 4,
        icon: Code,
        name: 'Code Refactorer',
        component: 'CodeRefactorer'
    },
    {
        id: 5,
        icon: User,
        name: 'Profile',
        component: 'Profile'
    },
    {
        id: 6,
        icon: Settings,
        name: 'Settings',
        component: 'Settings'
    },
]

export default nav_items;