import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../title/Title";

function preventDefault(event) {
    event.preventDefault();
}

export default function CardSales() {
    return (
        <React.Fragment>
            <Title>Total Sales</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2023
            </Typography>
        </React.Fragment>
    );
}
