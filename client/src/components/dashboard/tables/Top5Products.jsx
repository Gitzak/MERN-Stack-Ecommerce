import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Title from "../title/Title";
import { getTopFiveProducts } from "../../../api/ordersApi";
import { FormattedNumber } from "../FormattedNumber/FormattedNumber";

export default function Top5Products() {
    const [topFiveProducts, setTopFiveProducts] = useState([]);

    const fetchTopFiveProducts = async () => {
        try {
            const response = await getTopFiveProducts();
            setTopFiveProducts(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchTopFiveProducts();
    }, []);

    return (
        <React.Fragment>
            <Title>Top 5 Products</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="center">Quantity Sold</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topFiveProducts.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="center">{row.count}</TableCell>
                            <TableCell align="right">
                                <FormattedNumber value={row.unitPrice} />
                            </TableCell>
                            <TableCell align="right">
                                <FormattedNumber value={row.totalPrice} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="text" color="primary" component={Link} to="/dashboard/products" sx={{ mb: 2, pt: 1 }}>
                See All products
            </Button>
        </React.Fragment>
    );
}
