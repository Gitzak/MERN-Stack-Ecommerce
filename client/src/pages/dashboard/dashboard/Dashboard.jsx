import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";
import { SalesChart } from "../../../components/dashboard/charts/SalesChart";
import CardSales from "../../../components/dashboard/cards/CardSales";
import LatestOrders from "../../../components/dashboard/tables/LatestOrders";
import Top5Products from "../../../components/dashboard/tables/Top5Products";
import { UserContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Dashboard() {
    useEffect(() => {
        document.title = `Dashboard - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const [value, setValue] = React.useState(moment("2022-04-17"));

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container sx={{ marginBottom: 5, display: "flex", justifyContent:"end" }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker label="Uncontrolled picker" defaultValue={moment("2022-04-17")} />
                        <DatePicker label="Controlled picker" value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 140,
                        }}>
                        <CardSales />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 140,
                        }}>
                        <CardSales />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 140,
                        }}>
                        <CardSales />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 140,
                        }}>
                        <CardSales />
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
