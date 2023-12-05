import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginCustomer } from "../../../../api/customerApi";
import { setCurrentCustomer } from "../../../../store/customer/customer.action";


const SignInForm = () => {
  const dispatch = useDispatch()
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
        const response = await LoginCustomer(values);
        const loggedCustomer = response.data;
        console.log('this is loggedCustomer',response.data);
        localStorage.setItem("CustomerId", loggedCustomer.customer._id);
        localStorage.setItem("token", JSON.stringify(loggedCustomer.token));
        dispatch(setCurrentCustomer(loggedCustomer));
        navigate("/shop");
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div className="login-register-form">
      <form onSubmit={formik.handleSubmit} >
        <input
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

        <input
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
        {/* {error && <Typography style={{ color: "red" }}>{error}</Typography>} */}

        <button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#e3a346", padding: "5px 20px", marginTop: 2 }}
          type="submit"
        >
            <span>Login</span>
        </button>
      </form>

    </div>
  );
};

export default SignInForm;
