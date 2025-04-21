import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
    user: string | null;
    credits: number | null;
    setCredits: React.Dispatch<React.SetStateAction<number | null>>;
  };
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider ({ children }:React.PropsWithChildren) {
    const [user, setUser] = useState<string | null>(null);
    const [credits, setCredits] = useState<number | null>(null);

    const token = localStorage.getItem("token");
    const credit = localStorage.getItem("credits");
    useEffect(() => {
        if(token ){
            setUser(token);
            setCredits(credit ? parseInt(credit) : 0);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, credits, setCredits }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;