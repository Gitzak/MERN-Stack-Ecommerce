import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";
import CardSales from "../../../components/dashboard/cards/CardSales";
import LatestOrders from "../../../components/dashboard/tables/LatestOrders";
import Top5Products from "../../../components/dashboard/tables/Top5Products";
import { UserContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAllCustomers, getAllNewOrders, getAllOrders } from "../../../api/statisticsApi";
import { useState } from "react";
import { DateRange } from "../../../components/dashboard/DateRange/DateRange";

import { useRef } from "react";
import { useContext } from "react";
import { DashboardC } from "../../../context/dashboardContext";
import SalesChart from "../../../components/dashboard/charts/SalesChart";

export default function Dashboard() {
    const [allOrders, setAllOrders] = useState(0);
    const [allNewOrders, setAllNewOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [allCustomers, setAllCustomers] = useState(0);
    const [value, setValue] = useState({
        allOrders: 0,
        allNewOrders: 0,
        totalRevenue: 0,
        allCustomers: 0,
    });

    useEffect(() => {
        document.title = `Dashboard - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const { handleDateRangeChange, setCurrWeek } = DashboardC(); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            
            const response = await getAllOrders();
            setAllOrders(response.data.orders.length);

            const response2 = await getAllNewOrders();
            setAllNewOrders(response2.data.orders.length);

            const response3 = await getAllCustomers();
            setAllCustomers(response3.data.data.length);

            const totalRevenueValue = response.data.orders.reduce((total, order) => {
                return total + parseFloat(order.cartTotalPrice);
            }, 0);

            setTotalRevenue(totalRevenueValue);

            // Set initial value as 0 for animation
            setValue({
                allOrders: 0,
                allNewOrders: 0,
                totalRevenue: 0,
                allCustomers: 0,
            });
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((prevValue) => ({
                allOrders: prevValue.allOrders < allOrders ? prevValue.allOrders + 10 : allOrders,
                allNewOrders: prevValue.allNewOrders < allNewOrders ? prevValue.allNewOrders + 1 : allNewOrders,
                totalRevenue: prevValue.totalRevenue < totalRevenue ? prevValue.totalRevenue + 10000 : totalRevenue,
                allCustomers: prevValue.allCustomers < allCustomers ? prevValue.allCustomers + 1 : allCustomers,
            }));
        }, 1); // Adjust the interval duration as needed

        return () => clearInterval(interval);
    }, [allOrders, allNewOrders, totalRevenue, allCustomers]);

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container sx={{ marginBottom: 5, display: "flex", justifyContent: "end" }}>
                <DateRange />
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#29ADB2" title="New Orders" value={value.allNewOrders} iconName="LocalMallIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#c5f1e0" title="Total revenues" value={value.totalRevenue} type="amount" iconName="AttachMoneyIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#FECDA6" title="All orders" value={value.allOrders} type="count" iconName="PeopleIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#f1e5c5" title="Customers" value={value.allCustomers} iconName="PeopleIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 440,
                        }}>
                            <SalesChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                        <LatestOrders />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                        <Top5Products />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
