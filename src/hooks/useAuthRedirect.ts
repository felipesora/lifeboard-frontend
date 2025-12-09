import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../services/authService";

export function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/");
        }
    }, [navigate]);
}