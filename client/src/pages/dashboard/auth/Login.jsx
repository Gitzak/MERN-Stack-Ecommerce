import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginUser } from "../../../api/userApi";
import { UserC } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link target="_blank" color="inherit" href="https://creativestudios.ma/">
                CREATIVE STUDIOS
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const defaultTheme = createTheme();

export const Login = () => {
    useEffect(() => {
        document.title = `Login - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const navigate = useNavigate();
    const { setCurrentUser } = UserC();

    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let body = {
            email: data.get("email"),
            password: data.get("password"),
        };
        try {
            const response = await LoginUser(body);
            const loggedUser = response.data;
            // console.log(loggedUser);
            localStorage.setItem("userId", loggedUser.user._id);
            localStorage.setItem("token", JSON.stringify(loggedUser.token));
            setCurrentUser(loggedUser);
            navigate("/dashboard");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                            {error && <div style={{ color: "red" }}>{error}</div>}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
