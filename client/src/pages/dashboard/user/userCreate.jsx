import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Switch,
    TextField,
} from "@mui/material";
import { Link, generatePath, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FileUploader from "../../../components/dashboard/FileUploader/FileUploader";
import { getAllCategories } from "../../../api/categoriesApi";
import { createProduct } from "../../../api/productsApi";
import Swal from "sweetalert2";
import { createUsers, getAllUsers } from "../../../api/userApi";

const animatedComponents = makeAnimated();

function generateRandomPassword() {
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
}

// const validationSchema = yup.object({
//     sku: yup.string("Enter SKU").required("SKU is required"),
//     productName: yup
//         .string("Enter product name")
//         .required("Product name is required"),
//     // categories: yup.array().min(1, "At least one category is required"),
//     shortDescription: yup.string().required("Short description is required"),
//     longDescription: yup.string().required("Long description is required"),
//     price: yup
//         .number()
//         .typeError("Price must be a number")
//         .min(0, "Price cannot be negative")
//         .required("Price is required"),
//     discountPrice: yup
//         .number()
//         .typeError("Discount price must be a number")
//         .min(0, "Discount price cannot be negative")
//         .required("Discount price is required"),
//     quantity: yup
//         .number()
//         .typeError("Quantity must be a number")
//         .min(0, "Quantity cannot be negative")
//         .required("Quantity is required"),
// });
const validationSchema = yup.object({
    firstName: yup
        .string("Enter First Name")
        .required("First Name is required"),
    lastName: yup.string("Enter Last Name").required("Last Name is required"),
    userName: yup.string("Enter User Name").required("User Name is required"),
    email: yup
        .string("Enter Email")
        .email("Enter a valid email")
        .required("Email is required"),
});

const UserCreate = () => {
    const navigate = useNavigate();
    // const [dataRole, setDataRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const options = [
        { label: "Admin", value: "ADMIN" },
        { label: "Manager", value: "MANAGER" },
    ];
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            active: false,
            role: [],
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Example usage
            const randomPassword = generateRandomPassword();
            // console.log(randomPassword);

            // console.log("values", values);
            // return
            setLoading(true);
            // const selectedRole = values.role ? values.role.value : null;

            // Extract the value from the role object
            const selectedRoleValue = values.role ? values.role.value : null;
            // console.log("role new", selectedRoleValue);

            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("userName", values.userName);
            formData.append("role", selectedRoleValue);
            formData.append("active", values.active);
            formData.append("password",randomPassword);
            // console.log(formData);
            // for (const pair of formData.entries()) {
            //     console.log(pair[0], pair[1]);
            // }
            // Assuming userUpdate is defined elsewhere
            createUsers(formData)
                .then((response) => {
                    // console.log(response);
                    setLoading(false);
                    if (response.data.status === 201) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "User added successfully",
                            confirmButtonText: "OK",
                            customClass: {
                                container: "swal2-container",
                            },
                            didOpen: () => {
                                document.querySelector(
                                    ".swal2-container"
                                ).style.zIndex = 10000;
                            },
                        }).then(() => {
                            navigate(`/dashboard/users`);
                        });
                    }
                })
                .catch((error) => {
                    setLoading(false);

                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error.response.data.message,
                            confirmButtonText: "OK",
                            customClass: {
                                container: "swal2-container",
                            },
                            didOpen: () => {
                                document.querySelector(
                                    ".swal2-container"
                                ).style.zIndex = 10000;
                            },
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to add product",
                            confirmButtonText: "OK",
                            customClass: {
                                container: "swal2-container",
                            },
                            didOpen: () => {
                                document.querySelector(
                                    ".swal2-container"
                                ).style.zIndex = 10000;
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
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ mb: 2, pt: 1 }}
                        >
                            Add new user
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/dashboard/users"
                            startIcon={<ArrowBackIcon />}
                            sx={{ mb: 2, pt: 1 }}
                        >
                            Back to Users
                        </Button>
                    </Box>

                    <Box>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <form
                                onSubmit={formik.handleSubmit}
                                encType="multipart/form-data"
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6} >
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            margin="normal"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.firstName &&
                                                Boolean(formik.errors.firstName)
                                            }
                                            helperText={
                                                formik.touched.firstName &&
                                                formik.errors.firstName
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            margin="normal"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.lastName &&
                                                Boolean(formik.errors.lastName)
                                            }
                                            helperText={
                                                formik.touched.lastName &&
                                                formik.errors.lastName
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            margin="normal"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.email &&
                                                Boolean(formik.errors.email)
                                            }
                                            helperText={
                                                formik.touched.email &&
                                                formik.errors.email
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <TextField
                                            fullWidth
                                            label="userName"
                                            name="userName"
                                            margin="normal"
                                            value={formik.values.userName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.userName &&
                                                Boolean(formik.errors.userName)
                                            }
                                            helperText={
                                                formik.touched.userName &&
                                                formik.errors.userName
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Select
                                            placeholder="Select a role"
                                            closeMenuOnSelect={false}
                                            name="role"
                                            components={animatedComponents}
                                            options={options}
                                            
                                            value={formik.values.role}
                                         
                                            onChange={(selectedRoles) => {
                                                // console.log(selectedRoles);
                                                // Ensure selectedRoles is an array

                                                formik.setFieldValue(
                                                    "role",
                                                    selectedRoles
                                                );
                                                // console.log(selectedRoles);
                                            }}
                                            // onChange={formik.handleChange}
                                            // value={formik.values.role}
                                        ></Select>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    defaultChecked
                                                    name="active"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                            }
                                            label="Active"
                                            // sx={{ mt: 2, pt: 1 }}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            size="large"
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            sx={{ mt: 2, pt: 1 }}
                                        >
                                            {loading ? "Adding..." : "Add User"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserCreate;
