import * as React from "react";
import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { deleteProduct, getAllProducts } from "../../../api/productsApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import { FormattedNumber } from "../../../components/dashboard/FormattedNumber/FormattedNumber";

export const Products = () => {
    useEffect(() => {
        document.title = `Products - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.data.products); // Assuming the API returns an array of products
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const columns = [
        {
            field: "productImages",
            headerName: "Image",
            editable: false,
            sortable: false,
            renderCell: (params) => {
                if (params.value[0]) {
                    const link_src = params.value[0];
                    const link_src_square = link_src.replace("upload", "upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai");
                    return <img src={link_src_square} alt={`Product Image`} style={{ width: 50, height: 50 }} />;
                }
            },
        },
        {
            field: "productName",
            headerName: "Product name",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "price",
            headerName: "Price",
            width: 150,
            editable: false,
            renderCell: (params) => <FormattedNumber value={params.value} />,
        },
        {
            field: "discountPrice",
            headerName: "Discount Price",
            width: 150,
            editable: false,
            renderCell: (params) => <FormattedNumber value={params.value} />,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            // type: "number",
            // width: 150,
            editable: false,
        },
        {
            field: "active",
            headerName: "State",
            type: "boolean",
            width: 150,
            editable: false,
            renderCell: (params) => <span style={{ color: params.value ? "green" : "red" }}>{params.value ? "Active" : "Inactive"}</span>,
        },
        {
            field: "recommended",
            headerName: "recommended",
            type: "boolean",
            width: 150,
            editable: false,
            renderCell: (params) => <span style={{ color: params.value ? "#E89D4A" : "black" }}>{params.value ? "Promoted" : "Basic"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <Button sx={{ margin: 1 }} variant="contained" color="success" startIcon={<EditIcon />} component={Link} to={`/dashboard/products/update/${params.id}`}>
                        Edit
                    </Button>
                    <Button sx={{ margin: 1 }} variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(params.id)}>
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const handleDelete = (id) => {
        // Show SweetAlert confirmation modal
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                container: "swal2-container", // Add a custom class for the container
            },
            didOpen: () => {
                // Set a higher zIndex for the modal
                document.querySelector(".swal2-container").style.zIndex = 10000;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                    .then((response) => {
                        if (response.data.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: response.data.message,
                                confirmButtonText: "OK",
                                customClass: {
                                    container: "swal2-container",
                                },
                                didOpen: () => {
                                    document.querySelector(".swal2-container").style.zIndex = 10000;
                                },
                            }).then(() => {
                                // refresh
                                fetchProducts();
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire("Error!", "Failed to delete the product.", "error");
                    });
            }
        });
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            Products
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/dashboard/products/create" sx={{ mb: 2, pt: 1 }}>
                            + Add Product
                        </Button>
                    </Box>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            List of Products
                        </Typography>
                        <Box sx={{ width: "100%" }}>
                            <DataGrid
                                rows={products}
                                columns={columns}
                                getRowId={(row) => row._id}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                disableColumnFilter
                                // disableColumnSelector
                                disableDensitySelector
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                    },
                                }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                disableRowSelectionOnClick
                                autoHeight
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
