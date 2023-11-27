import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { CustomerC } from "../../../../context/shopContext/customer/CustomerContext";
import { LoginCustomer } from "../../../../api/customerApi";

const SignInForm = () => {
  const { setCurrentCustomer } = CustomerC();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await LoginCustomer(values);
        const loggedCustomer = data;
        localStorage.setItem("CustomerId", loggedCustomer.customer._id);
        localStorage.setItem("token", JSON.stringify(loggedCustomer.token));
        setCurrentCustomer(loggedCustomer);
        navigate("/shop");
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '70vh' }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        I already have an account
      </Typography>
      <Typography mb={3} color="textSecondary">
        Sign in with your email and password
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <Typography style={{ color: "red" }}>{error}</Typography>}

        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#e3a346", padding: "5px 20px", marginTop: 2 }}
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <Typography >
        You Don't have an account 
        <Link to={'/shop/signUp'}> <span>Sign Up </span></Link>
      </Typography>
    </div>
  );
};

export default SignInForm;
