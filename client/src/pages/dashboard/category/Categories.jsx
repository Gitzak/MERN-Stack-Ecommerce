import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

export default function Categories() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Typography component="h1" variant="h5">
                    Categories
                </Typography>
            </Grid>
        </Container>
    );
}