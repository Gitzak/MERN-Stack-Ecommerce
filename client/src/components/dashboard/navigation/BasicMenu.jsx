import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserC } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function BasicMenu() {
    const { currentUser, setCurrentUser } = UserC();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
        // return <Navigate to="/dashboard/products/update/65574b7d77e6de3c95c6e32f" replace={true}/>;
    };

    return (
        <div>
            <Button color="inherit" id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                Hey {currentUser && (currentUser.user?.userName || currentUser?.userName)}
            </Button>
            {/* <IconButton color="inherit" id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                <AccountCircleIcon />
            </IconButton> */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
