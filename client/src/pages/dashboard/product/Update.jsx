import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Grid, Paper, Container, Typography, Box, Button, FormControl, Select } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getProduct } from "../../../api/productsApi";

export const Update = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const data =[
        {
           label: "color",
           option: [
                "black",
                "red"
            ],
            _id: "65495b012b7185a8c5ae00e1"
        },
        {
           label: "size",
           option: [
                "S",
                "M"
            ],
            _id: "65495b012b7185a8c5ae00e2"
        }
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProduct(id);
                setProductData(response.data.data);
                console.log(response.data.data)
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
            productName: "",
            sku: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        if (productData) {
            formik.setValues({
                productName: productData.productName || "",
                sku: productData.sku || "",
                categories: productData.categories || [],
                shortDescription: productData.shortDescription || "",
                longDescription: productData.longDescription || "",
                price: productData.price || 0,
                discountPrice: productData.discountPrice || 0,
                quantity: productData.quantity || 0,
                options: productData.options || [],
                active: productData.active || false,
            });
        }
    }, [productData]);

    return (
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            Update product
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
                                    {/* {productData && productData.options.map((product)=>(
                                        product.option.map((option,index)=>{
                                            console.log(option)
                                            return(
                                                <>
                                                <h1 key={index}>{option}</h1> <br />
                                                </>
                                            )
                                        })
                                    ))} */}
                                    <FormControl fullWidth>
                                                    <Select
                                                        closeMenuOnSelect={true}
                                                        // components={animatedComponents}
                                                        options={data.map((dataOption) => ({ value: dataOption._id, label: dataOption.label }))}
                                                        onChange={(selectedOptions) => handleFirstSelectChange(option.id, selectedOptions)}
                                                    />
                                                </FormControl>
                                    
                                    
                                </Grid>
                                <Button type="submit" variant="contained" color="primary">
                                    Update
                                </Button>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
