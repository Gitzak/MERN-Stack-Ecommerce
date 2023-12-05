import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../title/Title";
import { useState } from "react";
import { getAllProducts } from "../../../api/productsApi";
import { useEffect } from "react";
import { DashboardC } from "../../../context/dashboardContext";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, "16 Mar, 2019", "Elvis Presley", "Tupelo, MS", "VISA ⠀•••• 3719", 312.44),
    createData(1, "16 Mar, 2019", "Paul McCartney", "London, UK", "VISA ⠀•••• 2574", 866.99),
    createData(2, "16 Mar, 2019", "Tom Scholz", "Boston, MA", "MC ⠀•••• 1253", 100.81),
    createData(3, "16 Mar, 2019", "Michael Jackson", "Gary, IN", "AMEX ⠀•••• 2000", 654.39),
    createData(4, "15 Mar, 2019", "Bruce Springsteen", "Long Branch, NJ", "VISA ⠀•••• 5919", 212.79),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Top5Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dummyVariable, setDummyVariable] = useState(false);

    const { currWeek, dateRange, setDateRange, setCurrWeek } = DashboardC();

    const triggerEffectAgain = () => {
        setDummyVariable((prev) => !prev);
    };

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            // console.log("res", response.data.products);
            // console.log("weekStart", dateRange[0]);
            const sortedProducts = response.data.products
                .filter((product) => {
                    const productDate = new Date(product.createdAt);
                    return productDate >= dateRange[0] && productDate <= dateRange[1];
                })
                .sort((a, b) => b.quantity - a.quantity);
            const top5Products = sortedProducts.slice(0, 5);
            setProducts(top5Products);
        } catch (error) {
            // console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     setLoading(true);
    //     fetchProducts();
    // }, [dateRange]);

    // useEffect(() => {
    //     setDateRange(currWeek);
    //     console.log("useEff", dateRange);
    // }, []);
    useEffect(() => {
        setDateRange(currWeek);
    }, [currWeek]);

    // Fetch products when dateRange changes
    useEffect(() => {
        setLoading(true);
        fetchProducts();
    }, [dateRange, dummyVariable]);

    return (
        <React.Fragment>
            {/* {console.log("current Week", dateRange)} */}
            <Title>Top 5 Products</Title>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell align="right">Discount Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!products && !products.length() ? (
                                <p>No Products</p>
                            ) : (
                                <>
                                    {products &&
                                        products.map((product) => (
                                            <TableRow key={product._id}>
                                                <TableCell>{product.createdAt}</TableCell>
                                                <TableCell>{product.productName}</TableCell>
                                                <TableCell>{product.sku}</TableCell>
                                                <TableCell>{`$${product.price}`}</TableCell>
                                                <TableCell align="right">{`$${product.discountPrice}`}</TableCell>
                                            </TableRow>
                                        ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                        See more products
                    </Link>
                </>
            )}
            {/* {console.log(products && products.length)} */}
        </React.Fragment>
    );
}
