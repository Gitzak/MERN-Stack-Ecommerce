import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { LoginCustomer } from "../../api/customerApi";
import { setCurrentCustomer } from "../../store/customer/customer.action";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
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
        localStorage.setItem("CustomerId", loggedCustomer.customer._id);
        localStorage.setItem("tokenC", JSON.stringify(loggedCustomer.token));
        dispatch(setCurrentCustomer(loggedCustomer));
        navigate("/shop/my-account");
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div className="login-register-form">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.email && formik.errors.email ? "is-invalid" : ""}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback" style={{marginTop:"2px"}}>{formik.errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.password && formik.errors.password ? "is-invalid" : ""}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className="button-box">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
