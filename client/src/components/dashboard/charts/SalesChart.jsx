import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
} from "recharts";
import Title from "../title/Title";
import { useEffect } from "react";
import { getAllOrders } from "../../../api/ordersApi";
import { useState } from "react";
import {
    Button,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import moment from "moment";

export const SalesChart = () => {
    const [orders, setOrders] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [timePeriod, setTimePeriod] = useState("Daily");
    const [alignment, setAlignment] = useState("web");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const buttons = [
        <ToggleButton
            value="one"
            key="one"
            onClick={() => setTimePeriod("Daily")}
        >
            Daily
        </ToggleButton>,
        <ToggleButton
            value="two"
            key="two"
            onClick={() => setTimePeriod("Weekly")}
        >
            Weekly
        </ToggleButton>,
        <ToggleButton
            value="three"
            key="three"
            onClick={() => setTimePeriod("Monthly")}
        >
            Monthly
        </ToggleButton>,
        <ToggleButton
            value="four"
            key="four"
            onClick={() => setTimePeriod("Yearly")}
        >
            Yearly
        </ToggleButton>,
    ];

    const theme = useTheme();
    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const groupDataByTimePeriod = (data, timePeriod) => {
        return data.reduce((acc, item) => {
            const date = moment(item.date);
            let groupKey;

            switch (timePeriod) {
                case "Daily":
                    groupKey = date.format("DD/MM/YYYY");
                    break;
                case "Weekly":
                    groupKey = `Week ${date.week()} ${date.year()}`;
                    break;
                case "Monthly":
                    groupKey = date.format("MMM YYYY");
                    break;
                case "Yearly":
                    groupKey = date.format("YYYY");
                    break;
                default:
                    groupKey = item.date;
            }

            if (!acc[groupKey]) {
                acc[groupKey] = {
                    date: groupKey,
                    amount: 0,
                };
            }

            acc[groupKey].amount += item.amount;
            return acc;
        }, {});
    };

    useEffect(() => {
        try {
            const sortedOrders = orders.sort(
                (a, b) => a.orderDate - b.orderDate
            );

            const data = sortedOrders.map((order) => {
                return {
                    date: new Date(order.orderDate).toLocaleDateString(),
                    amount: order.cartTotalPrice,
                };
            });

            // const data = orders.map((order) => {
            //     return {
            //         date: new Date(order.orderDate).toLocaleDateString(),
            //         amount: order.cartTotalPrice,
            //     };
            // });

            const groupedData = groupDataByTimePeriod(data, timePeriod);
            setGraphData(Object.values(groupedData));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }, [orders, timePeriod]);

    const formatXAxis = (tickItem) => {
        switch (timePeriod) {
            case "Daily":
                return moment(tickItem, "DD/MM/YYYY").format("DD/MM");
            case "Weekly":
                // Extract week number from the string
                const weekNumber = tickItem.split(" ")[1];
                return `Week ${weekNumber}`;
            case "Monthly":
                return moment(tickItem, "MMM YYYY").format("MMM YYYY");
            case "Yearly":
                return moment(tickItem, "YYYY").format("YYYY");
            default:
                return tickItem;
        }
    };

    const xAxisMin = Math.min(
        ...graphData.map((item) => new Date(item.date).getTime())
    );
    const xAxisMax = Math.max(
        ...graphData.map((item) => new Date(item.date).getTime())
    );

    const yAxisMin = Math.min(...graphData.map((item) => item.amount));
    const yAxisMax = Math.max(...graphData.map((item) => item.amount));

    return (
        <React.Fragment>
            <Title>Sales DATA</Title>

            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{ alignSelf: "center" }}
            >
                {buttons}
            </ToggleButtonGroup>
            <ResponsiveContainer>
                <LineChart
                    data={graphData}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="date"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                        tickFormatter={formatXAxis}
                        domain={[xAxisMin, xAxisMax]}
                    />

                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                        domain={[yAxisMin, yAxisMax]}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
            {console.log(graphData)}
        </React.Fragment>
    );
};
