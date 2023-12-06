import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StoreIcon from '@mui/icons-material/Store';
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.css";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={NavLink} to="/dashboard/">
            <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/dashboard/orders">
            <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/dashboard/customers">
            <ListItemIcon>
                <PeopleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader sx={{ backgroundColor: "#272727", color: "#fff" }} component="div" inset>
            Catalogue
        </ListSubheader>
        <ListItemButton component={NavLink} to="/dashboard/products">
            <ListItemIcon>
                <Inventory2Icon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/dashboard/categories">
            <ListItemIcon>
                <AutoAwesomeMotionIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItemButton>
    </React.Fragment>
);

export const userManagerListItems = (
    <React.Fragment>
        <ListSubheader sx={{ backgroundColor: "#272727", color: "#fff" }} component="div" inset>
            Users Manager
        </ListSubheader>
        <ListItemButton component={NavLink} to="/dashboard/users">
            <ListItemIcon>
                <GroupAddIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
    </React.Fragment>
);

export const goToShopListItems = (
    <React.Fragment>
        <ListSubheader sx={{ backgroundColor: "#272727", color: "#fff" }} component="div" inset>
            Shop
        </ListSubheader>
        <ListItemButton component={NavLink} to="/shop" target="_blank">
            <ListItemIcon>
                <StoreIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Go To Shop" />
        </ListItemButton>
    </React.Fragment>
);
