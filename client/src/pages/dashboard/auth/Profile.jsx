import * as React from "react";
import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Paper, Tab, Tabs, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getDataProfile, updateDataProfile, updatePassword } from "../../../api/userApi";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const personalInfoValidationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    userName: yup.string().required("Username is required"),
});

const passwordValidationSchema = yup.object({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export const Profile = () => {
    useEffect(() => {
        document.title = `Profile - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const [loadingPersonalInfo, setLoadingPersonalInfo] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const [id, setId] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getDataProfile();
                setId(response.data.data._id);
                formikPersonalInfo.setValues({
                    firstName: response.data.data.firstName || "",
                    lastName: response.data.data.lastName || "",
                    email: response.data.data.email || "",
                    userName: response.data.data.userName || "",
                    role: response.data.data.role || "",
                    active: response.data.data.active || "",
                });
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProfile();
    }, []);

    const handlePersonalInfoSubmit = async (values) => {
        setLoadingPersonalInfo(true);
        const formData = new FormData();

        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("userName", values.userName);
        formData.append("role", values.role);
        formData.append("active", values.active);

        updateDataProfile(id, formData)
            .then((response) => {
                setLoadingPersonalInfo(false);
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "success",
                        text: response.data.message,
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                }
            })
            .catch((error) => {
                // console.log(error);
                setLoadingPersonalInfo(false);
                if (error.response && error.response.data && error.response.data.message) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message,
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to update profile",
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                }
            });
    };

    const handlePasswordSubmit = async (values) => {
        setLoadingPassword(true);
        const formData = new FormData();

        formData.append("password", values.password);

        updatePassword(id, formData)
            .then((response) => {
                setLoadingPassword(false);
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "success",
                        text: response.data.message,
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                    formikPassword.setValues({
                        password: "",
                        confirmPassword: "",
                    });
                    formikPassword.validateForm();
                }
            })
            .catch((error) => {
                // console.log(error);
                setLoadingPassword(false);
                if (error.response && error.response.data && error.response.data.message) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message,
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to update password",
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                }
            });
    };

    const formikPersonalInfo = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            role: "",
            active: "",
        },
        validationSchema: personalInfoValidationSchema,
        onSubmit: handlePersonalInfoSubmit,
    });

    const formikPassword = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: passwordValidationSchema,
        onSubmit: handlePasswordSubmit,
    });

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            My Profile
                        </Typography>
                    </Box>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Personal info" {...a11yProps(0)} />
                                <Tab label="Password" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <span style={{ fontWeight: 500 }}>Personal info</span>
                            <Box>
                                <form onSubmit={formikPersonalInfo.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="First name"
                                                name="firstName"
                                                margin="normal"
                                                value={formikPersonalInfo.values.firstName}
                                                onChange={formikPersonalInfo.handleChange}
                                                onBlur={formikPersonalInfo.handleBlur}
                                                error={formikPersonalInfo.touched.firstName && Boolean(formikPersonalInfo.errors.firstName)}
                                                helperText={formikPersonalInfo.touched.firstName && formikPersonalInfo.errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Last name"
                                                name="lastName"
                                                margin="normal"
                                                value={formikPersonalInfo.values.lastName}
                                                onChange={formikPersonalInfo.handleChange}
                                                onBlur={formikPersonalInfo.handleBlur}
                                                error={formikPersonalInfo.touched.lastName && Boolean(formikPersonalInfo.errors.lastName)}
                                                helperText={formikPersonalInfo.touched.lastName && formikPersonalInfo.errors.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                margin="normal"
                                                value={formikPersonalInfo.values.email}
                                                onChange={formikPersonalInfo.handleChange}
                                                onBlur={formikPersonalInfo.handleBlur}
                                                error={formikPersonalInfo.touched.email && Boolean(formikPersonalInfo.errors.email)}
                                                helperText={formikPersonalInfo.touched.email && formikPersonalInfo.errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="UserName"
                                                name="userName"
                                                margin="normal"
                                                value={formikPersonalInfo.values.userName}
                                                onChange={formikPersonalInfo.handleChange}
                                                onBlur={formikPersonalInfo.handleBlur}
                                                error={formikPersonalInfo.touched.userName && Boolean(formikPersonalInfo.errors.userName)}
                                                helperText={formikPersonalInfo.touched.userName && formikPersonalInfo.errors.userName}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Button type="submit" size="large" variant="contained" color="primary" onClick={formikPersonalInfo.handleSubmit} disabled={loadingPersonalInfo} sx={{ mt: 2, pt: 1 }}>
                                                {loadingPersonalInfo ? "Saving..." : "Save"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <span style={{ fontWeight: 500 }}>Password</span>
                            <Box>
                                <form onSubmit={formikPassword.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                type="password"
                                                label="Password"
                                                name="password"
                                                margin="normal"
                                                value={formikPassword.values.password}
                                                onChange={formikPassword.handleChange}
                                                onBlur={formikPassword.handleBlur}
                                                error={formikPassword.touched.password && Boolean(formikPassword.errors.password)}
                                                helperText={formikPassword.touched.password && formikPassword.errors.password}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                type="password"
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                margin="normal"
                                                value={formikPassword.values.confirmPassword}
                                                onChange={formikPassword.handleChange}
                                                onBlur={formikPassword.handleBlur}
                                                error={formikPassword.touched.confirmPassword && Boolean(formikPassword.errors.confirmPassword)}
                                                helperText={formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Button type="submit" size="large" variant="contained" color="primary" onClick={formikPassword.handleSubmit} disabled={loadingPassword} sx={{ mt: 2, pt: 1 }}>
                                                {loadingPassword ? "Saving..." : "Save"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </CustomTabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
