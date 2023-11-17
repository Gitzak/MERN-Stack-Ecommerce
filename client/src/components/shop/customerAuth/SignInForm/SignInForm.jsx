import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CustomerC } from "../../../../context/shopContext/CustomerContext";
import { LoginCustomer } from "../../../../api/customerApi";

import "./SignInForm.css";

const SignInForm = () => {
  const { setCurrentCustomer } = CustomerC();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const {data} = await LoginCustomer(values);
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
    <div className="sign-in-container">
      <h2>I already Have an account </h2>
      <span>Sign In with your email and Password</span>
      <form onSubmit={formik.handleSubmit}>
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
          label="Password"
          name="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}

        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#e3a346", padding: "5px 20px" }}
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
