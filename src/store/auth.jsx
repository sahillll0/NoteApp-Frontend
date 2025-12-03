import { useState, useContext, useCallback } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"))

    const storeTokenLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };


    const LogOutUser = useCallback(() => {
        setToken("");
        return localStorage.removeItem("token");
    }, []);



    return <AuthContext.Provider value={{ token, storeTokenLS, LogOutUser }} >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}