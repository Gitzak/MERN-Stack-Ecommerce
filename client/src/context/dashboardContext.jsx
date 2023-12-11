import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const [dateRange, setDateRange] = useState([]);
    const [currWeek, setCurrWeek] = useState([]);

    // const handleThisWeek = () => {
    //     const st = moment().startOf("week");
    //     const en = moment().endOf("week");
    //     console.log(st, en);
    //     setcurrWeek({ st: dayjs(st), en: dayjs(en) });
    // };
    const handleDateRangeChange = (dates) => {
        setDateRange(dates);
        // console.log("dateRange: ", dateRange);
        // console.log("dates default : ", dates);
    };

    // useEffect(() => {}, []);

    const value = {
        currWeek,
        setCurrWeek,
        dateRange,
        setDateRange,
        // handleThisWeek,
        handleDateRangeChange,
    };

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const DashboardC = () => {
    const Context = useContext(DashboardContext);
    if (!Context) {
        throw new Error("no context provided");
    }
    return Context;
};

export default DashboardProvider;
