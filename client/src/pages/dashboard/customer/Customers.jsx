import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getAllCustomers } from "../../../api/customerApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const customerData = await getAllCustomers();
      // console.log(customerData.data.data);
      setCustomers(customerData.data.data);
    } catch (error) {
      console.error("Error fetching Customers:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch customers",
      });
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleUpdateClick = (customerId) => {
    // console.log(customerId);
    navigate(`/dashboard/customers/Update/${customerId}`);
    // navigate("/");
  };
  const customerColumns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "creationDate",
      headerName: "Creation Date",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    // {
    //   field: "active",
    //   headerName: "State",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <span>{params.value ? "Active" : "Inactive"}</span>
    //   ),
    // },
    {
      field: "active",
      headerName: "State",
      type: "boolean",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <span style={{ color: params.value ? "green" : "red" }}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        // <Button
        //   variant="outlined"
        //   color="primary"
        //   onClick={() => handleUpdateClick(params.row._id)}
        // >
        //   Update
        // </Button>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          color="success"
          startIcon={<EditIcon />}
          onClick={() => handleUpdateClick(params.row._id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const dataGridConfig = {
    pageSize: 10,
    checkboxSelection: true,
    disableColumnFilter: true,
    disableColumnSelector: true,
    disableDensitySelector: true,
    disableRowSelectionOnClick: true,
    autoHeight: true,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
              Customers
            </Typography>
          </Box>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              List of Customers
            </Typography>
            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={customers}
                columns={customerColumns}
                getRowId={(row) => row._id}
                {...dataGridConfig}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Customers;
