import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import { createUsers, updateUsers } from "../../../api/userApi";

const animatedComponents = makeAnimated();

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

const UserUpdate = ({ user, isModalOpen, setIsModalOpen, fetchUsers }) => {
    // const [updatedUser, setUpdatedUser] = useState({});

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
        fetchUsers();
    };

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
            // console.log(values.role?.value);
            const id = user && user._id;
            // console.log(values.active);

            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("userName", values.userName);
            formData.append("role", values.role?.value);
            formData.append("active", values.active);

            // Other form submission logic...
            updateUsers(id, formData)
                .then((response) => {
                    // console.log(response);
                    setLoading(false);
                    if (response.data.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "User Updated successfully",
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
                            text: "Failed to Update product",
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
    useEffect(() => {
        if (user) {
            // Find the corresponding role object in the options array
            const userRoleOption = options.find(
                (option) => option.value === user.role
            );

            // Actions to perform with the updated state
            formik.setValues({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: userRoleOption || null, // Set the found option or null if not found
                userName: user.userName,
                active: user.active,
            });
        }
    }, [user]); // Run this effect when targetUser changes

    return (
        <>
            <Dialog
                open={isModalOpen}
                // open={true}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Box
                                    mt={2}
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        component="h1"
                                        variant="h5"
                                        sx={{ mb: 2, pt: 1 }}
                                    >
                                        Update User
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClose}
                                        startIcon={<ArrowBackIcon />}
                                        sx={{ mb: 2, pt: 1 }}
                                    >
                                        Exit
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
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="First Name"
                                                        name="firstName"
                                                        margin="normal"
                                                        value={
                                                            formik.values
                                                                .firstName
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        error={
                                                            formik.touched
                                                                .firstName &&
                                                            Boolean(
                                                                formik.errors
                                                                    .firstName
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .firstName &&
                                                            formik.errors
                                                                .firstName
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Last Name"
                                                        name="lastName"
                                                        margin="normal"
                                                        value={
                                                            formik.values
                                                                .lastName
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        error={
                                                            formik.touched
                                                                .lastName &&
                                                            Boolean(
                                                                formik.errors
                                                                    .lastName
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .lastName &&
                                                            formik.errors
                                                                .lastName
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        margin="normal"
                                                        value={
                                                            formik.values.email
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        error={
                                                            formik.touched
                                                                .email &&
                                                            Boolean(
                                                                formik.errors
                                                                    .email
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .email &&
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
                                                        value={
                                                            formik.values
                                                                .userName
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        error={
                                                            formik.touched
                                                                .userName &&
                                                            Boolean(
                                                                formik.errors
                                                                    .userName
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .userName &&
                                                            formik.errors
                                                                .userName
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <Select
                                                        placeholder="Select a role"
                                                        closeMenuOnSelect={
                                                            false
                                                        }
                                                        name="role"
                                                        components={
                                                            animatedComponents
                                                        }
                                                        options={options}
                                                        value={
                                                            formik.values.role
                                                        }
                                                        onChange={(
                                                            selectedRoles
                                                        ) => {
                                                            formik.setFieldValue(
                                                                "role",
                                                                selectedRoles
                                                            );
                                                        }}
                                                    />
                                                    {/* <Select placeholder="Select a role"
                                                        closeMenuOnSelect={
                                                            false
                                                        }
                                                        name="role"
                                                        components={
                                                            animatedComponents
                                                        }
                                                        value={
                                                            formik.values.role
                                                        }
                                                        onChange={(
                                                            selectedRoles
                                                        ) => {
                                                            formik.setFieldValue(
                                                                "role",
                                                                selectedRoles
                                                            );
                                                        }}
                                                    >
                                                        //{" "}
                                                        <Option value="ADMIN">
                                                            Admin
                                                        </Option>
                                                        //{" "}
                                                        <Option value="MANAGER">
                                                            Manager
                                                        </Option>
                                                        //{" "}
                                                    </Select> */}
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    formik
                                                                        .values
                                                                        .active
                                                                }
                                                                onChange={(e) =>
                                                                    formik.setFieldValue(
                                                                        "active",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                                name="active"
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
                                                        {loading
                                                            ? "Updating..."
                                                            : "Save"}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserUpdate;
