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
import { getAllCategories } from "../../../api/categoriesApi";
import { createProduct, getProduct, updateProduct } from "../../../api/productsApi";
import Swal from "sweetalert2";

const animatedComponents = makeAnimated();

const validationSchema = yup.object({
    sku: yup.string("Enter SKU").required("SKU is required"),
});

export const Update = () => {
    useEffect(() => {
        document.title = `Edit product - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const navigate = useNavigate();
    const [dataCategories, setDataCategories] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState(null);

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
                // console.log(" 2 ", transformedCategories);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProduct(id);
                setProductData(response.data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

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
                    option: item.option.map((optionItem) => optionItem),
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

            updateProduct(id, formData)
                .then((response) => {
                    // console.log(response);
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

    useEffect(() => {
        if (productData) {
            const selectedCategories = productData.categories || [];
            const formattedCategories = selectedCategories.map((category) => ({
                value: category._id,
                label: category.category_name,
            }));
            formik.setValues({
                productName: productData.productName || "",
                sku: productData.sku || "",
                categories: formattedCategories || [],
                shortDescription: productData.shortDescription || "",
                longDescription: productData.longDescription || "",
                price: productData.price || 0,
                discountPrice: productData.discountPrice || 0,
                quantity: productData.quantity || 0,
                options: productData.options || [],
                active: productData.active || false,
                recommended: productData.recommended || false,
                images: productData.productImages || false,
            });
        }
    }, [productData]);

    const handleCategoryChange = (selectedOptions) => {
        // console.log(selectedOptions);
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
        const latestId = newOptions.length > 0 ? Math.max(...newOptions.map((option) => parseInt(option._id))) : 0;
        const newOptionId = (latestId + 1).toString();
        newOptions.push({ _id: newOptionId, label: "", option: [], secondOptions: [] });
        formik.setFieldValue("options", newOptions);
    };

    const handleFirstSelectChange = (index, selectedOption) => {
        const updatedOptions = [...formik.values.options];
        updatedOptions[index].label = selectedOption.label;
        updatedOptions[index].option = [];

        const dataIndex = dataOptions.findIndex((dataOption) => dataOption.label === selectedOption.label);

        if (dataIndex !== -1) {
            const alreadySelectedOptions = updatedOptions.flatMap((opt) => opt.option);
            const unselectedOptions = dataOptions[dataIndex].options.filter((opt) => !alreadySelectedOptions.includes(opt));
            updatedOptions[index].secondOptions = unselectedOptions.map((opt) => ({ value: opt, label: opt }));
        }

        formik.setFieldValue("options", updatedOptions);
    };

    const handleOptionChange = (id, selectedOptions) => {
        const updatedOptions = formik.values.options.map((option) => {
            if (option._id === id) {
                return { ...option, option: selectedOptions.map((opt) => opt.value) };
            }
            return option;
        });

        formik.setFieldValue("options", updatedOptions);
    };

    const handleOptionDelete = (index) => {
        const updatedOptions = [...formik.values.options];
        updatedOptions.splice(index, 1);
        formik.setFieldValue("options", updatedOptions);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            Edit product
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/dashboard/products" startIcon={<ArrowBackIcon />} sx={{ mb: 2, pt: 1 }}>
                            Back to Products
                        </Button>
                    </Box>

                    {!productData ? (
                        // Render a loader when productData is not available
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
                                            <FormControlLabel control={<Switch checked={formik.values.active} name="active" onChange={formik.handleChange} />} label="Active" sx={{ mt: 2, pt: 1 }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControlLabel control={<Switch checked={formik.values.recommended} name="recommended" onChange={formik.handleChange} />} label="Recommended" sx={{ mt: 2, pt: 1 }} />
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
                                            <React.Fragment key={index}>
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            closeMenuOnSelect={true}
                                                            components={animatedComponents}
                                                            options={dataOptions.map((dataOption) => ({ value: dataOption.value, label: dataOption.label }))}
                                                            onChange={(selectedOptions) => handleFirstSelectChange(index, selectedOptions)}
                                                            value={{ value: option.label, label: option.label }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            isMulti
                                                            closeMenuOnSelect={true}
                                                            components={animatedComponents}
                                                            // options={(dataOptions.find((dataOption) => dataOption.value === option.label)?.options || []).map((opt) => ({ value: opt, label: opt }))}
                                                            options={option.secondOptions || []}
                                                            value={option.option.map((opt) => ({ value: opt, label: opt }))}
                                                            onChange={(selectedOptions) => handleOptionChange(option._id, selectedOptions)}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton onClick={() => handleOptionDelete(index)} color="error" aria-label="delete">
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
                                            <FileUploader onFileUpload={handleFileUpload} onFileDelete={handleFileDelete} existingImages={productData.productImages} />
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
