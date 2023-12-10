import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Title from "../title/Title";
import { getAllOrders } from "../../../api/ordersApi";
import { FormattedNumber } from "../FormattedNumber/FormattedNumber";

export default function LatestOrders() {
    const [orders, setOrders] = useState([]);

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

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.slice(0, 5).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{`#${row.orderNumber.toString().padStart(6, "0")}`}</TableCell>
                            <TableCell>{new Date(row.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell>{row.customerFirstName}</TableCell>
                            <TableCell align="right">
                                <FormattedNumber value={row.cartTotalPrice} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="text" color="primary" component={Link} to="/dashboard/orders" sx={{ mb: 2, pt: 1 }}>
                See more orders
            </Button>
        </React.Fragment>
    );
}
