import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Container, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Switch, TextField } from "@mui/material";
import { Link, generatePath, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FileUploader from "../../../components/dashboard/FileUploader/FileUploader";
import { createCategory, getAllCategories } from "../../../api/categoriesApi";
import { createProduct } from "../../../api/productsApi";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NoImageFound from "../../../assets/img/Image_not_available.png";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const animatedComponents = makeAnimated();

const validationSchema = yup.object({
    category_name: yup.string("Category name").required("Category name is required"),
});

export const CreateCategory = () => {
    useEffect(() => {
        document.title = `Create new category - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const navigate = useNavigate();
    const [dataCategories, setDataCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                const categoriesData = response.data.data;
                const transformedCategories = categoriesData.map((category) => ({
                    value: category._id,
                    label: category.category_name,
                }));
                setDataCategories(transformedCategories);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleRemoveImage = () => {
        formik.setFieldValue("image", NoImageFound);
    };

    const handleImageChange = (e) => {
        const selectedFile = e.currentTarget.files[0];
        console.log("Selected File:", selectedFile); // For debugging - you can remove this later
        formik.setFieldValue("image", selectedFile);
    };

    const formik = useFormik({
        initialValues: {
            category_name: "",
            description: "",
            parentId: null,
            image: null,
            active: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const formData = new FormData();

            formData.append("category_name", values.category_name);
            formData.append("description", values.description);
            formData.append("parentId", values.parentId);
            formData.append("active", values.active);
            formData.append("image", values.image);

            createCategory(formData)
                .then((response) => {
                    setLoading(false);
                    if (response.data.status === 201) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: response.data.message,
                            confirmButtonText: "OK",
                            customClass: {
                                container: "swal2-container",
                            },
                            didOpen: () => {
                                document.querySelector(".swal2-container").style.zIndex = 10000;
                            },
                        }).then(() => {
                            navigate(`/dashboard/categories/update/${response.data.data._id}`);
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
                        // If error doesn't contain a specific message
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to add category",
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
                            Add new Category
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/dashboard/categories" startIcon={<ArrowBackIcon />} sx={{ mb: 2, pt: 1 }}>
                            Back to Categories
                        </Button>
                    </Box>

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
                                            label="Category Name"
                                            name="category_name"
                                            margin="normal"
                                            value={formik.values.category_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.category_name && Boolean(formik.errors.category_name)}
                                            helperText={formik.touched.category_name && formik.errors.category_name}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel control={<Switch defaultChecked name="active" onChange={formik.handleChange} />} label="Active" sx={{ mt: 2, pt: 1 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            maxRows={5}
                                            label="Description"
                                            name="description"
                                            margin="normal"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Select
                                            closeMenuOnSelect={true}
                                            name="parentId"
                                            components={animatedComponents}
                                            options={dataCategories}
                                            value={dataCategories.find((category) => category.value === formik.values.parentId)} // Adjust the value prop
                                            isClearable
                                            onChange={(selectedOption) => formik.setFieldValue("parentId", selectedOption?.value || null)} // Adjust the onChange prop
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 1, pt: 1 }}>
                                            Upload Image
                                            <VisuallyHiddenInput
                                                name="image"
                                                onChange={handleImageChange}
                                                type="file"
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Box
                                            sx={{
                                                width: "200px",
                                            }}>
                                            <img
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    border: "2px solid rgba(189, 189, 189, 1)",
                                                }}
                                                src={formik.values.image ? URL.createObjectURL(formik.values.image) : NoImageFound}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button type="submit" size="large" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, pt: 1 }}>
                                            {loading ? "Adding..." : "Add Category"}
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
