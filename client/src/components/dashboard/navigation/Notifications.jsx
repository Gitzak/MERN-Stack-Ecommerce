import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useNavigate } from "react-router-dom";
import sound from "../../../assets/ding.mp3"

export const Notifications = () => {
    const [webSocket, setWebSocket] = useState([]);
    const [notif, setNotif] = useState([]);
    const navigate = useNavigate();
    const [audio] = useState(new Audio(sound));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:7501/");

        ws.onmessage = (e) => {
            const newdata = JSON.parse(e.data);
            setNotif((prev) => {
                const updatedNotifs = [newdata, ...prev];
                localStorage.setItem("notifications", JSON.stringify(updatedNotifs));
                playNotificationSound();
                return updatedNotifs;
            });
        };

        const storedNotifications = JSON.parse(localStorage.getItem("notifications"));
        if (storedNotifications) {
            setNotif(storedNotifications);
        }

        return () => {
            ws.close();
        };
    }, []);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClick = (notification) => {
        navigate(`/dashboard/orders/`);
    };

    const handleClearNotifications = () => {
        setNotif([]);
        localStorage.removeItem("notifications");
    };

    const playNotificationSound = () => {
        audio.play(); // Play the notification sound
    };

    return (
        <div>
            <IconButton color="inherit" id="notif-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                <Badge badgeContent={notif.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            {notif.length > 0 && (
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "notif-button",
                    }}>
                    <nav aria-label="secondary mailbox folders">
                        <List style={{ width: "450px", maxHeight: "360px", overflowY: "auto" }}>
                            {notif.map((notification, index) => (
                                <React.Fragment key={index}>
                                    <ListItem disablePadding onClick={() => handleNotificationClick(notification)}>
                                        <ListItemAvatar style={{ marginLeft: 20 }}>
                                            <Avatar>{notification.userName}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemButton>
                                            <ListItemText primary={notification.data} />
                                        </ListItemButton>
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </nav>
                    <Button onClick={handleClearNotifications}>Clear Notifications</Button>
                </Menu>
            )}
        </div>
    );
};
