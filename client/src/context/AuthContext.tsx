import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider ({ children }:any) {
    const [user, setUser] = useState<string | null>(null);

    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token ){
            setUser(token);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;