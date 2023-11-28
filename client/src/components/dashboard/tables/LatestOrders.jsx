// import * as React from "react";
// import Link from "@mui/material/Link";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Title from "../title/Title";

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//     return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//     createData(0, "16 Mar, 2019", "Elvis Presley", "Tupelo, MS", "VISA ⠀•••• 3719", 312.44),
//     createData(1, "16 Mar, 2019", "Paul McCartney", "London, UK", "VISA ⠀•••• 2574", 866.99),
//     createData(2, "16 Mar, 2019", "Tom Scholz", "Boston, MA", "MC ⠀•••• 1253", 100.81),
//     createData(3, "16 Mar, 2019", "Michael Jackson", "Gary, IN", "AMEX ⠀•••• 2000", 654.39),
//     createData(4, "15 Mar, 2019", "Bruce Springsteen", "Long Branch, NJ", "VISA ⠀•••• 5919", 212.79),
// ];

// function preventDefault(event) {
//     event.preventDefault();
// }

// export default function LatestOrders() {
//     return (
//         <React.Fragment>
//             <Title>Recent Orders</Title>
//             <Table size="small">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Ship To</TableCell>
//                         <TableCell>Payment Method</TableCell>
//                         <TableCell align="right">Sale Amount</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <TableRow key={row.id}>
//                             <TableCell>{row.date}</TableCell>
//                             <TableCell>{row.name}</TableCell>
//                             <TableCell>{row.shipTo}</TableCell>
//                             <TableCell>{row.paymentMethod}</TableCell>
//                             <TableCell align="right">{`$${row.amount}`}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
//                 See more orders
//             </Link>
//         </React.Fragment>
//     );
// }

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
            console.log(orders);
            // const data = orders.map((order, index) => {
            //     return createData(
            //         index,
            //         new Date(order.orderDate).toLocaleDateString(),
            //         order.customerFirstName,
            //         order.cartTotalPrice
            //     );
            // });

            // setRows(data);
            // console.log("rows", rows);
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
                            <TableCell>{ `#${row.orderNumber.toString().padStart(6, "0")}`}</TableCell>
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
                sx={{ mt: 3 }}
            >
                See more orders
            </Link>
        </React.Fragment>
    );
}
