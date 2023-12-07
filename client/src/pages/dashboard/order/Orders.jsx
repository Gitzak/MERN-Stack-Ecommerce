import * as React from "react";
import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Button, Chip, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import { getAllOrders, getOrder, updateOrders } from "../../../api/ordersApi";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FormattedNumber } from "../../../components/dashboard/FormattedNumber/FormattedNumber";
import DownloadIcon from "@mui/icons-material/Download";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import InvoicePDF from "../../../components/dashboard/InvoicePDF/InvoicePDF";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #fdfdfd",
    boxShadow: 24,
    p: 4,
};

export const Orders = () => {
    useEffect(() => {
        document.title = `Orders - ${import.meta.env.VITE_APP_TITLE}`;
    }, []);

    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderData, setSelectedOrderData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingShow, setLoadingShow] = useState(true);
    const [orderDateFormatted, setOrderDateFormatted] = useState(null);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        {
            field: "orderNumber",
            headerName: "Order Number",
            flex: 1,
            editable: false,
            renderCell: (params) => `#${params.value.toString().padStart(6, "0")}`,
        },
        {
            field: "cartTotalPrice",
            headerName: "Total",
            flex: 1,
            editable: false,
            renderCell: (params) => <FormattedNumber value={params.value} />,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            editable: false,
            renderCell: (params) => {
                const status = params.value;
                let chipColor = "default";

                // Assign colors based on status
                switch (status) {
                    case "Cancelled":
                        chipColor = "error";
                        break;
                    case "Closed":
                        chipColor = "warning";
                        break;
                    case "Open":
                        chipColor = "success";
                        break;
                    case "Paid":
                        chipColor = "primary";
                        break;
                    case "Shipped":
                        chipColor = "info"; // Assuming you have a custom color named 'purple'
                        break;
                    default:
                        chipColor = "default";
                }

                return <Chip label={status} color={chipColor} />;
            },
        },
        {
            field: "orderDate",
            headerName: "Created",
            flex: 1,
            editable: false,
            renderCell: (params) => {
                const timestamp = params.value; // Assuming "createdTimestamp" is your timestamp field

                const date = new Date(timestamp);
                const formattedDate = date.toLocaleString(); // Convert to a localized date string

                return formattedDate;
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <Button sx={{ padding: 1, margin: 1 }} variant="contained" color="info" onClick={() => handleShow(params.id)}>
                        <RemoveRedEyeIcon />
                    </Button>
                    <Button sx={{ padding: 1, margin: 1 }} variant="contained" color="warning" onClick={() => handleEdit(params.id)}>
                        <EditIcon />
                    </Button>
                </Box>
            ),
        },
    ];

    const getColorForStatus = (status) => {
        switch (status) {
            case "Cancelled":
                return "error";
            case "Closed":
                return "warning";
            case "Open":
                return "success";
            case "Paid":
                return "primary";
            case "Shipped":
                return "info";
            default:
                return "default";
        }
    };

    const handleShow = async (id) => {
        try {
            setSelectedOrderId(id);
            const response = await getOrder(id);
            setSelectedOrderData(response.data.data);
            if (selectedOrderData) {
                // console.log(response.data.data.orderNumber);
                removeOrderNotification(response.data.data.orderNumber);
                const date = new Date(response.data.data.orderDate);
                setOrderDateFormatted(date.toLocaleString());
            }
            setOpenDialog(true);
            setLoadingShow(false);
        } catch (error) {
            setLoadingShow(true);
            console.error("Error fetching order details:", error);
        }
    };

    const handleCloseDetails = () => {
        setOpenDialog(false);
    };

    const handleEdit = async (id) => {
        try {
            const response = await getOrder(id);
            setSelectedOrderData(response.data.data);
            if (selectedOrderData) {
                // console.log(response.data.data.orderNumber);
                removeOrderNotification(response.data.data.orderNumber);
                const date = new Date(response.data.data.orderDate);
                setOrderDateFormatted(date.toLocaleString());
            }

            setOpenDialogEdit(true);
            setLoadingEdit(false);
        } catch (error) {
            setLoadingEdit(true);
            console.error("Error fetching order details:", error);
        }
    };

    const handleCloseEdit = () => {
        setOpenDialogEdit(false);
    };

    const removeOrderNotification = (orderNumberToRemove) => {
        const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];

        const updatedNotifications = storedNotifications.filter((notification) => {
            const orderNumber = notification.data.match(/#(\d{6})/);
            return orderNumber && orderNumber[1] !== String(orderNumberToRemove).padStart(6, "0");
        });

        localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    };

    const statusOptions = [
        { value: "Open", label: "Open" },
        { value: "Shipped", label: "Shipped" },
        { value: "Paid", label: "Paid" },
        { value: "Closed", label: "Closed" },
        { value: "Cancelled", label: "Cancelled" },
    ];

    useEffect(() => {
        if (selectedOrderData) {
            formik.setValues({
                status: selectedOrderData.status || "",
            });
        }
    }, [selectedOrderData]);

    const formik = useFormik({
        initialValues: {
            status: selectedOrderData.status || "",
        },
        onSubmit: async (values) => {
            if (values.status === "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Order status is required",
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

            formData.append("status", values.status);

            updateOrders(selectedOrderData._id, formData)
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
                        fetchOrders();
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

    const handleStatusChange = (status) => {
        formik.setFieldValue("status", status.value);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
                            Orders
                        </Typography>
                    </Box>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            List of Orders
                        </Typography>
                        <Box sx={{ width: "100%" }}>
                            <DataGrid
                                rows={orders}
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
                                disableColumnSelector
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

                    {/* modal show */}
                    <Modal keepMounted open={openDialog} onClose={handleCloseDetails} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
                        {loadingShow ? (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box sx={style}>
                                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                    Details Order #{selectedOrderData.orderNumber?.toString().padStart(6, "0")}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                    <Box>
                                        <Typography id="client-details" variant="body1" sx={{ mt: 1 }}>
                                            Client: {selectedOrderData.customerFirstName} {selectedOrderData.customerLastName}
                                        </Typography>
                                        <Typography id="email-details" variant="body1" sx={{ mt: 1 }}>
                                            Email: {selectedOrderData.customerEmail}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box id="order-state-details" variant="body1" sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                                            <Typography sx={{ marginRight: 1 }}>Order State:</Typography>
                                            <Chip label={selectedOrderData.status} color={getColorForStatus(selectedOrderData.status)} />
                                        </Box>
                                        <Typography id="date-details" variant="body1" sx={{ mt: 1 }}>
                                            Date: {orderDateFormatted}
                                        </Typography>
                                    </Box>
                                </Box>

                                <TableContainer sx={{ mt: 3 }} component={Paper}>
                                    <Table sx={{ minWidth: 600 }} aria-label="spanning table">
                                        <TableHead sx={{ backgroundColor: "#eee" }}>
                                            <TableRow>
                                                <TableCell align="center" colSpan={3}>
                                                    Details
                                                </TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Product</TableCell>
                                                <TableCell align="right">Qty</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedOrderData.orderItems?.map((item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        {item.itemName} <br /> {item.itemOptions}
                                                    </TableCell>
                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                    <TableCell align="right">
                                                        <FormattedNumber value={item.unitPrice} />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <FormattedNumber value={item.totalPrice} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell colSpan={2}>Subtotal</TableCell>
                                                <TableCell align="right">
                                                    <FormattedNumber value={selectedOrderData.cartSubTotalPrice} />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tax</TableCell>
                                                <TableCell align="right">{`${(selectedOrderData.tvaApplied * 100).toFixed(0)} %`}</TableCell>
                                                <TableCell align="right">
                                                    <FormattedNumber value={selectedOrderData.cartTotalPrice - selectedOrderData.cartSubTotalPrice} />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow sx={{ backgroundColor: "#45efe1" }}>
                                                <TableCell colSpan={2} sx={{ fontSize: 18, fontWeight: "bold" }}>
                                                    Total
                                                </TableCell>
                                                <TableCell align="right" sx={{ fontSize: 18, fontWeight: "bold" }}>
                                                    <FormattedNumber value={selectedOrderData.cartTotalPrice} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <PDFDownloadLink document={<InvoicePDF invoiceData={selectedOrderData} orderDateFormatted={orderDateFormatted} />} fileName="invoice.pdf">
                                    {({ blob, url, loading, error }) =>
                                        loading ? (
                                            <Button sx={{ mt: 3 }} variant="contained" color="secondary" disabled startIcon={<DownloadIcon />}>
                                                Loading invoice
                                            </Button>
                                        ) : (
                                            <Button sx={{ mt: 3 }} variant="contained" color="secondary" startIcon={<DownloadIcon />}>
                                                Download
                                            </Button>
                                        )
                                    }
                                </PDFDownloadLink>
                            </Box>
                        )}
                    </Modal>

                    {/* modal edit */}
                    <Modal open={openDialogEdit} onClose={handleCloseEdit} aria-labelledby="keep-mounted-modal-title-edit" aria-describedby="keep-mounted-modal-description-edit">
                        {loadingEdit ? (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box sx={style}>
                                <Typography id="keep-mounted-modal-title-edit" variant="h6" component="h2">
                                    Edit State Order # {selectedOrderData.orderNumber?.toString().padStart(6, "0")}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                    <Box>
                                        <Typography id="client-details" variant="body1" sx={{ mt: 1 }}>
                                            Client: {selectedOrderData.customerFirstName} {selectedOrderData.customerLastName}
                                        </Typography>
                                        <Typography id="email-details" variant="body1" sx={{ mt: 1 }}>
                                            Email: {selectedOrderData.customerEmail}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box id="order-state-details" variant="body1" sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                                            <Typography sx={{ marginRight: 1 }}>Order State:</Typography>
                                            <Chip label={selectedOrderData.status} color={getColorForStatus(selectedOrderData.status)} />
                                        </Box>
                                        <Typography id="date-details" variant="body1" sx={{ mt: 1 }}>
                                            Date: {orderDateFormatted}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ marginTop: 5 }}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Box xs={12}>
                                            <Select closeMenuOnSelect={true} name="status" components={animatedComponents} options={statusOptions} value={statusOptions.find((option) => option.value === formik.values.status)} onChange={handleStatusChange} />
                                            {/* <TextField
                                                fullWidth
                                                label="Status"
                                                name="status"
                                                margin="normal"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.status && Boolean(formik.errors.status)}
                                                helperText={formik.touched.status && formik.errors.status}
                                            /> */}
                                            {/* <FormControl fullWidth>
                                                <InputLabel id="status-label">Status</InputLabel>
                                                <Select labelId="status-label" id="status" name="status" value={formik.values.status} label="Status" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                                    {statusOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl> */}
                                        </Box>

                                        <Button size="large" type="submit" sx={{ mt: 3 }} variant="contained" color="warning">
                                            {loading ? "Saving..." : "Save"}
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        )}
                    </Modal>
                </Grid>
            </Grid>
        </Container>
    );
};
