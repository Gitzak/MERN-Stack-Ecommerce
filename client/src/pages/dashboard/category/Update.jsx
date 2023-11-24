import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getAllCategories, getCategory } from "../../../api/categoriesApi";
import Swal from "sweetalert2";

const animatedComponents = makeAnimated();

const validationSchema = yup.object({
  category_name: yup
    .string("Category name")
    .required("Category name is required"),
});

export const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCategories, setDataCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

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
      category_name: "",
      description: "",
      parentId: null,
      active: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();

      formData.append("category_name", values.category_name);
      formData.append("description", values.description);
      formData.append("parentId", values.parentId);
      formData.append("active", values.active);

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
              navigate(`/dashboard/products/update/${response.data.data._id}`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory(id);
        setCategoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (categoryData) {
        formik.setValues({
            category_name: productData.productName || "",
            description: productData.sku || "",
            parentId: productData.sku || "",
            description: productData.sku || "",
        });
    }
}, [categoryData]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography component="h1" variant="h5" sx={{ mb: 2, pt: 1 }}>
              Edit Category
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/dashboard/categories"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2, pt: 1 }}
            >
              Back to Categories
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
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Category Name"
                      name="category_name"
                      margin="normal"
                      value={formik.values.category_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.category_name &&
                        Boolean(formik.errors.category_name)
                      }
                      helperText={
                        formik.touched.category_name &&
                        formik.errors.category_name
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked
                          name="active"
                          onChange={formik.handleChange}
                        />
                      }
                      label="Active"
                      sx={{ mt: 2, pt: 1 }}
                    />
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
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      closeMenuOnSelect={true}
                      name="parentId"
                      components={animatedComponents}
                      options={dataCategories}
                      value={dataCategories.find(
                        (category) => category.value === formik.values.parentId
                      )} // Adjust the value prop
                      isClearable
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "parentId",
                          selectedOption?.value || null
                        )
                      } // Adjust the onChange prop
                    />
                  </Grid>

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
                      {loading ? "Editing..." : "Save Category"}
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
