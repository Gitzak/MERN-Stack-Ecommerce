import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const currentToken = localStorage.getItem("token");

    useEffect(() => {
        if (currentToken !== null) {
            fetch("http://localhost:7500/api/users/profile", {
                withCredentials: "include",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") === null ? null : JSON.parse(localStorage.getItem("token"))}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setCurrentUser(data.data);
                    // setid(data.userId);
                    // setusername(data.name);
                    // setloading(true)
                    // setimage(data.image);
                });
        }
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserC = () => {
    const Context = useContext(UserContext);
    if (!Context) {
        throw new Error("no context provided");
    }
    return Context;
};
