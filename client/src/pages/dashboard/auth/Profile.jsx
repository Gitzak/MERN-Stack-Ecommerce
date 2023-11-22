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
import { NumericFormat } from "react-number-format";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getDataProfile, updateDataProfile } from "../../../api/userApi";

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

const validationSchema = yup.object({
    firstName: yup.string("Enter first name").required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    email: yup.string().trim().email("Enter a valid email").required("Email is required"),
    userName: yup.string().trim().required("Username is required"),
});

export const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getDataProfile();
                setId(response.data.data._id);
                formik.setValues({
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

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            role: "",
            active: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const formData = new FormData();

            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("userName", values.userName);
            formData.append("role", values.role);
            formData.append("active", values.active);

            updateDataProfile(id, formData)
                .then((response) => {
                    setLoading(false);
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
                    console.log(error);
                    setLoading(false);
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
                            text: "Failed to update order status",
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
        },
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
                                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="First name"
                                                name="firstName"
                                                margin="normal"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Last name"
                                                name="lastName"
                                                margin="normal"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                margin="normal"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="UserName"
                                                name="userName"
                                                margin="normal"
                                                value={formik.values.userName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.userName && Boolean(formik.errors.userName)}
                                                helperText={formik.touched.userName && formik.errors.userName}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Button type="submit" size="large" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, pt: 1 }}>
                                                {loading ? "Saving..." : "Save"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <span style={{ fontWeight: 500 }}>Password</span>
                        </CustomTabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
