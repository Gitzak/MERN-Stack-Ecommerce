import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { getCustomerById, updateCustomer } from "../../../api/customerApi";
import axios from "axios";

const validationSchema = yup.object({
  firstName: yup.string("Enter First Name").required("First Name is required"),
  lastName: yup.string("Enter Last Name").required("Last Name is required"),
  email: yup
    .string("Enter Email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export const UpdateCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const fetchData = async () => {
    console.log(customerId);
    try {
      getCustomerById(customerId).then((response) => {
        setCustomerData(response.data.data);
      });
    } catch (error) {
      console.error("Error fetching customer:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch customer",
      });
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    [
      //  customerId
    ]
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      active: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("active", values.active);

      const updatedCustomerData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        active: values.active,
      };
      try {
        const response = await updateCustomer(customerId, updatedCustomerData);
        setLoading(false);

        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update customer",
          confirmButtonText: "OK",
        });
      }
    },
  });

  useEffect(() => {
    if (customerData) {
      formik.setValues({
        firstName: customerData.firstName || "",
        lastName: customerData.lastName || "",
        email: customerData.email || "",
        active: customerData.active || false,
      });
    }
  }, [customerData, formik]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
              Edit Customer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/dashboard/customers"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2, pt: 1 }}
            >
              Back to Products
            </Button>
          </Box>

          {!customerData ? (
            // Render a loader when customerData is not available
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
                    <Grid item xs={12}>
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
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                          formik.touched.lastName && formik.errors.lastName
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        margin="normal"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formik.values.active}
                            name="active"
                            onChange={formik.handleChange}
                          />
                        }
                        label="Active"
                        sx={{ mt: 2, pt: 1 }}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "end" }}
                    ></Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 2, pt: 1 }}
                      >
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
