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
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.css";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={NavLink} to="/dashboard/">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/dashboard/orders">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/dashboard/customers">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Catalogue
        </ListSubheader>
        <ListItemButton component={NavLink} to="/dashboard/products">
            <ListItemIcon>
                <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/dashboard/categories">
            <ListItemIcon>
                <AutoAwesomeMotionIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItemButton>
    </React.Fragment>
);

export const userManagerListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Users Manager
        </ListSubheader>
        <ListItemButton component={NavLink} to="/dashboard/users">
            <ListItemIcon>
                <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
    </React.Fragment>
);
