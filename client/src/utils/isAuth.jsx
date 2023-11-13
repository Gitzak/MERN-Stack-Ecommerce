import { UserC } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const isAuth = () => {
    const { currentUser } = UserC();

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
            return true
    }

    return false;   
};

