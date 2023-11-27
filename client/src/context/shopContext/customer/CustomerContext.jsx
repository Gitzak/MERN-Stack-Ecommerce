import { createContext, useContext, useEffect, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const currentToken = localStorage.getItem("token");

    useEffect(() => {
        if (currentToken !== null) {
            fetch("http://localhost:7500/api/customers/profile", {
                withCredentials: "include",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") === null ? null : JSON.parse(localStorage.getItem("token"))}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setCurrentCustomer(data.data);
                });
        }
    }, []);

    const value = {
        currentCustomer,
        setCurrentCustomer,
    };

    return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};

export const CustomerC = () => {
    const Context = useContext(CustomerContext);
    if (!Context) {
        throw new Error("no context provided");
    }
    return Context;
};
