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
import { getAllCategories } from "../../../api/categoriesApi";
import { createProduct } from "../../../api/productsApi";
import Swal from "sweetalert2";

const animatedComponents = makeAnimated();

const validationSchema = yup.object({
    sku: yup.string("Enter SKU").required("SKU is required"),
    productName: yup.string("Enter product name").required("Product name is required"),
    // categories: yup.array().min(1, "At least one category is required"),
    shortDescription: yup.string().required("Short description is required"),
    longDescription: yup.string().required("Long description is required"),
    price: yup.number().typeError("Price must be a number").min(0, "Price cannot be negative").required("Price is required"),
    discountPrice: yup.number().typeError("Discount price must be a number").min(0, "Discount price cannot be negative").required("Discount price is required"),
    quantity: yup.number().typeError("Quantity must be a number").min(0, "Quantity cannot be negative").required("Quantity is required"),
});

export const Create = () => {
    useEffect(() => {
        document.title = `Create new Prodoct - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const navigate = useNavigate();
    const [dataCategories, setDataCategories] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (files) => {
        setUploadedFiles([...uploadedFiles, ...files]);
        const currentImages = formik.values.images;
        const updatedImages = [...currentImages, ...files];
        formik.setFieldValue("images", updatedImages);
    };

    const handleFileDelete = (deletedFile) => {
        const updatedUploadedFiles = uploadedFiles.filter((file) => file.name !== deletedFile.name);
        setUploadedFiles(updatedUploadedFiles);
        const currentImages = formik.values.images;
        const updatedImages = currentImages.filter((file) => file.name !== deletedFile.name);
        formik.setFieldValue("images", updatedImages);
    };

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

    const formik = useFormik({
        initialValues: {
            sku: "",
            images: [],
            productName: "",
            categories: [],
            shortDescription: "",
            longDescription: "",
            price: 0,
            discountPrice: 0,
            quantity: 0,
            options: [],
            active: false,
            recommended: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (values.categories.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "At least one category is required",
                    confirmButtonText: "OK",
                    customClass: {
                        container: "swal2-container",
                    },
                    didOpen: () => {
                        document.querySelector(".swal2-container").style.zIndex = 10000;
                    },
                });
                return;
            }

            setLoading(true);
            const formData = new FormData();

            const transformedOptions = values.options.map((item) => {
                return {
                    label: item.label,
                    option: item.values.map((optionItem) => optionItem.value),
                };
            });

            formData.append("sku", values.sku);
            formData.append("productName", values.productName);
            formData.append("active", values.active);
            formData.append("recommended", values.recommended);
            formData.append("shortDescription", values.shortDescription);
            formData.append("longDescription", values.longDescription);
            formData.append("price", values.price);
            formData.append("discountPrice", values.discountPrice);
            formData.append("quantity", values.quantity);
            formData.append("options", JSON.stringify(transformedOptions));
            formData.append(
                "categories",
                values.categories.map((category) => category.value)
            );

            for (let i = 0; i < values.images.length; i++) {
                formData.append("images", values.images[i]);
            }

            createProduct(formData).then((response) => {
                    // console.log(response);
                    setLoading(false);
                    if (response.data.status === 201) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Product added successfully",
                            confirmButtonText: "OK",
                            customClass: {
                                container: "swal2-container",
                            },
                            didOpen: () => {
                                document.querySelector(".swal2-container").style.zIndex = 10000;
                            },
                        }).then(() => {
                            navigate(`/dashboard/products/update/${response.data.data._id}`);
                        });
                    }
                })
                .catch((error) => {
                    // console.log(error.request.responseText);
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
                            text: "Failed to add product",
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

    const handleCategoryChange = (selectedOptions) => {
        formik.setFieldValue("categories", selectedOptions);
    };

    const dataOptions = [
        { value: "size", label: "Size", options: ["S", "M", "L", "XL"] },
        { value: "color", label: "Color", options: ["Red", "Black", "Blue", "Green"] },
        { value: "material", label: "Material", options: ["Cotton", "Polyester", "Wool", "Silk"] },
        { value: "style", label: "Style", options: ["Casual", "Formal", "Sportswear", "Bohemian"] },
    ];

    const handleOptionAdd = () => {
        const newOptions = [...formik.values.options];
        const latestId = newOptions.length > 0 ? Math.max(...newOptions.map((option) => parseInt(option.id))) : 0;
        const newOptionId = (latestId + 1).toString();
        newOptions.push({ id: newOptionId, label: "", values: [] });
        formik.setFieldValue("options", newOptions);
    };

    const generateUniqueId = () => {
        const latestId = formik.values.options.length > 0 ? Math.max(...formik.values.options.map((option) => parseInt(option.id))) : 0;
        return (latestId + 1).toString();
    };

    const handleFirstSelectChange = (id, selectedOption) => {
        const newOptions = [...formik.values.options];
        const optionIndex = newOptions.findIndex((option) => option.id === id);

        if (optionIndex !== -1) {
            newOptions[optionIndex].label = selectedOption.value;
            newOptions[optionIndex].values = [];
            formik.setFieldValue("options", newOptions);
        }
    };

    const handleOptionChange = (id, selectedOptions) => {
        const newOptions = [...formik.values.options];
        const optionIndex = newOptions.findIndex((option) => option.id === id);

        if (optionIndex !== -1) {
            newOptions[optionIndex].values = selectedOptions;
            formik.setFieldValue("options", newOptions);
        }
    };

    const handleOptionDelete = (id) => {
        const newOptions = formik.values.options.filter((option) => option.id !== id);
        formik.setFieldValue("options", newOptions);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            Add new product
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/dashboard/products" startIcon={<ArrowBackIcon />} sx={{ mb: 2, pt: 1 }}>
                            Back to Products
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
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Product Name"
                                            name="productName"
                                            margin="normal"
                                            value={formik.values.productName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                                            helperText={formik.touched.productName && formik.errors.productName}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="SKU" name="sku" margin="normal" value={formik.values.sku} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.sku && Boolean(formik.errors.sku)} helperText={formik.touched.sku && formik.errors.sku} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Quantity"
                                            name="quantity"
                                            margin="normal"
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                            helperText={formik.touched.quantity && formik.errors.quantity}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Price"
                                            name="price"
                                            margin="normal"
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.price && Boolean(formik.errors.price)}
                                            helperText={formik.touched.price && formik.errors.price}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Discount Price"
                                            name="discountPrice"
                                            margin="normal"
                                            value={formik.values.discountPrice}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.discountPrice && Boolean(formik.errors.discountPrice)}
                                            helperText={formik.touched.discountPrice && formik.errors.discountPrice}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Short description"
                                            name="shortDescription"
                                            margin="normal"
                                            value={formik.values.shortDescription}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                                            helperText={formik.touched.shortDescription && formik.errors.shortDescription}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControlLabel control={<Switch defaultChecked name="active" onChange={formik.handleChange} />} label="Active" sx={{ mt: 2, pt: 1 }} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControlLabel control={<Switch defaultChecked name="recommended" onChange={formik.handleChange} />} label="Recommended" sx={{ mt: 2, pt: 1 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            maxRows={5}
                                            label="Long description"
                                            name="longDescription"
                                            margin="normal"
                                            value={formik.values.longDescription}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.longDescription && Boolean(formik.errors.longDescription)}
                                            helperText={formik.touched.longDescription && formik.errors.longDescription}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Select closeMenuOnSelect={false} name="categories" components={animatedComponents} isMulti options={dataCategories} value={formik.values.categories} onChange={handleCategoryChange} />
                                    </Grid>
                                    {formik.values.options.map((option, index) => (
                                        <React.Fragment key={option.id}>
                                            <Grid item xs={5}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        closeMenuOnSelect={true}
                                                        components={animatedComponents}
                                                        options={dataOptions.map((dataOption) => ({ value: dataOption.value, label: dataOption.label }))}
                                                        onChange={(selectedOptions) => handleFirstSelectChange(option.id, selectedOptions)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        isMulti
                                                        options={(dataOptions.find((dataOption) => dataOption.value === option.label)?.options || []).map((opt) => ({ value: opt, label: opt }))}
                                                        value={option.values}
                                                        onChange={(selectedOptions) => handleOptionChange(option.id, selectedOptions)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton onClick={() => handleOptionDelete(option.id)} color="error" aria-label="delete">
                                                    <RemoveCircleOutlineIcon />
                                                </IconButton>
                                            </Grid>
                                        </React.Fragment>
                                    ))}

                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button variant="outlined" color="primary" onClick={handleOptionAdd} sx={{ mt: 2, pt: 1 }}>
                                            + Add Option
                                        </Button>
                                    </Grid>

                                    <Grid item sx={{ margin: 3, width: "100%" }}>
                                        <FileUploader onFileUpload={handleFileUpload} onFileDelete={handleFileDelete} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button type="submit" size="large" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, pt: 1 }}>
                                            {loading ? "Adding..." : "Add Product"}
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
