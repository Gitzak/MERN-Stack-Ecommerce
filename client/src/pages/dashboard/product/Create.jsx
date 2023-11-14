import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Switch, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDropzone } from 'react-dropzone';

const animatedComponents = makeAnimated();

const validationSchema = yup.object({
    sku: yup.string("Enter SKU").required("SKU is required"),
});

const dataCategories = [
    { value: "1", label: "Category 1" },
    { value: "2", label: "Category 2" },
    { value: "3", label: "Category 3" },
];

export const Create = () => {
    const formik = useFormik({
        initialValues: {
            sku: "",
            productImages: [],
            productName: "",
            categories: [],
            shortDescription: "",
            longDescription: "",
            price: 0,
            discountPrice: 0,
            quantity: 0,
            options: [],
            active: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
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
                            <form onSubmit={formik.handleSubmit}>
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
                                    <Grid item xs={6}>
                                        <FormControlLabel control={<Switch defaultChecked />} label="Active" sx={{ mt: 2, pt: 1 }} />
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
                                </Grid>
                                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, pt: 1 }}>
                                    Add Product
                                </Button>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
