import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
    const navigate = useNavigate();
    const { LogOutUser } = useAuth();

    useEffect(() => {
        LogOutUser();
        navigate("/login");
    }, [LogOutUser, navigate]);

    // Render nothing while logging out and redirecting
    return null;
};

 