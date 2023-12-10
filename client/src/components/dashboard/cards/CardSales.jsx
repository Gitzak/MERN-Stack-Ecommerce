import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../title/Title";
import { Box, styled } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FormattedNumber } from "../../../components/dashboard/FormattedNumber/FormattedNumber";

// function preventDefault(event) {
//     event.preventDefault();
// }

const BlackTitle = styled(Typography)({
    color: "#000",
    fontSize: 20,
    fontWeight: 400,
});

function renderIcon(iconName) {
    switch (iconName) {
        case "LocalMallIcon":
            return <LocalMallIcon sx={{ fontSize: 50 }} />;
        case "PeopleIcon":
            return <PeopleIcon sx={{ fontSize: 50 }} />;
        case "AttachMoneyIcon":
            return <AttachMoneyIcon sx={{ fontSize: 50 }} />;
        default:
            return null;
    }
}

export default function CardSales(props) {
    const IconComponent = renderIcon(props.iconName);

    return (
        <Box sx={{ backgroundColor: props.color, padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
                <BlackTitle>{props.title}</BlackTitle>
                <Typography component="p" variant="h5">
                    {props.type === "amount" ? <FormattedNumber value={props.value} /> : props.value}
                </Typography>
            </Box>
            <Box>{IconComponent}</Box>
        </Box>
    );
}
