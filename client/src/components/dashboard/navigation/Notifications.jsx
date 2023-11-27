import React, { useEffect, useState } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const Notifications = () => {
    const [webSocket, setWebSocket] = useState([]);
    const [notif, setNotif] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:7501/");

        ws.onopen = (e) => {
            console.log("connnect to sockets");
        };

        ws.onmessage = (e) => {
            const newdata = JSON.parse(e.data);
            setNotif((prev) => [...prev, newdata]);

            console.log("message received from socket", JSON.parse(e.data));
        };
        ws.onclose = () => {
            console.log("close socket");
        };
    }, []);

    return (
        <div>
            <IconButton color="inherit" id="notif-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                <Badge badgeContent={notif.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "notif-button",
                }}>
                <MenuItem>text text text text text text text text</MenuItem>
            </Menu>
        </div>
    );
};
