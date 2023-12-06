import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Switch, TextField } from "@mui/material";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FileUploader from "../../../components/dashboard/FileUploader/FileUploader";
import Swal from "sweetalert2";
import { getCustomerById, updateCustomer } from "../../../api/customerApi";

const animatedComponents = makeAnimated();

const validationSchema = yup.object({
    firstName: yup.string("Enter First Name").required("First Name is required"),
    lastName: yup.string("Enter Last Name").required("Last Name is required"),
    email: yup.string("Enter Email").email("Enter a valid email").required("Email is required"),
    phoneNumber: yup
        .string()
        .matches(/^\+[0-9]+$/, { message: "Phone number must start with a plus sign (+)" })
        .required("Phone number is required"),
});

export const UpdateCustomer = () => {
    useEffect(() => {
        document.title = `Edit cutomer - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const navigate = useNavigate();

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCustomerById(id);
                setCustomerData(response.data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (customerData) {
            formik.setValues({
                firstName: customerData.firstName || "",
                lastName: customerData.lastName || "",
                email: customerData.email || "",
                phoneNumber: customerData.phoneNumber || "",
                active: customerData.active || false,
            });
        }
    }, [customerData]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            active: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const formData = new FormData();

            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("active", values.active);

            updateCustomer(id, formData)
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
                            text: "Failed to update customer",
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

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            Edit Customer
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/dashboard/customers" startIcon={<ArrowBackIcon />} sx={{ mb: 2, pt: 1 }}>
                            Back to Customers
                        </Button>
                    </Box>

                    {!customerData ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
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
                                                label="Last Name"
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
                                                label="Phone Number"
                                                name="phoneNumber"
                                                margin="normal"
                                                value={formik.values.phoneNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControlLabel control={<Switch checked={formik.values.active} name="active" onChange={formik.handleChange} />} label="Active" sx={{ mt: 2, pt: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                            <Button type="submit" size="large" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, pt: 1 }}>
                                                {loading ? "Saving..." : "Save"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
