import React from "react";
import "./notFound.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const NotFound = () => {
    return (
        <div id="main">
            <div className="fof">
                <h1>Error 404</h1>
                <br />
                <Button variant="contained" color="primary" component={Link} to="/dashboard" startIcon={<ArrowBackIcon />} sx={{ mb: 2, pt: 1 }}>
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};
