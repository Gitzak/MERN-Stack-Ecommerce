import * as React from "react";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../title/Title";
import { getAllOrders } from "../../../api/ordersApi";

// Generate Order Data
function createData(id, date, name, amount) {
    return { id, date, name, amount };
}

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function LatestOrders() {
    const [rows, setRows] = useState([]);
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
                            <TableCell align="right">{`$${row.cartTotalPrice}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link
                color="primary"
                href="#"
                // onClick={preventDefault}
                sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}
