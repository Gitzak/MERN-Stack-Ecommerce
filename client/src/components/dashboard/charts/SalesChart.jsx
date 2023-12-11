import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from "recharts";
import Title from "./../title/Title";
import { getSalesChartData } from "../../../api/ordersApi";
import { FormattedNumber } from "../FormattedNumber/FormattedNumber";

export default function SalesChart() {
    const theme = useTheme();
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        getSalesChartData()
            .then((response) => {
                const formattedData = response.data.orders.map((order) => ({
                    date: new Date(order._id).toLocaleDateString(), // Format date as per requirement
                    totalSales: order.totalSales,
                }));
                setSalesData(formattedData);
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
            });
    }, []);

    const formatTooltip = (value) => {
        return <FormattedNumber value={value} />;
    };

    return (
        <React.Fragment>
            <Title>Sales Data</Title>
            <ResponsiveContainer>
                <LineChart
                    data={salesData}
                    margin={{
                        top: 16,
                        right: 26,
                        bottom: 0,
                        left: 24,
                    }}>
                    <XAxis dataKey="date" stroke="#3d3d3d" style={theme.typography.body1} />
                    <YAxis stroke="#3d3d3d" style={theme.typography.body1}>
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}>
                            Total Sales (Dhs | درهم)
                        </Label>
                    </YAxis>
                    <Tooltip formatter={formatTooltip} />
                    <Line isAnimationActive={false} type="catmullRom" dataKey="totalSales" stroke="#252525" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
