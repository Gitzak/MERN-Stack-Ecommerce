import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { RegisterCustomer } from "../../api/customerApi";

const Register = () => {
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Invalid phone number")
      .required("Phone Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const newCustomer = await RegisterCustomer(values);
        // console.log(newCustomer);
      } catch (error) {
        // console.log(error.message);
        setError(error.message);
      }
    },
  });

  return (
    <div className="login-register-form">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.firstName && formik.errors.firstName
              ? "is-invalid"
              : ""
          }
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="invalid-feedback" style={{ marginTop: "2px" }}>
            {formik.errors.firstName}
          </div>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.lastName && formik.errors.lastName
              ? "is-invalid"
              : ""
          }
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="invalid-feedback" style={{ marginTop: "2px" }}>
            {formik.errors.lastName}
          </div>
        )}

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.email && formik.errors.email ? "is-invalid" : ""
          }
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback" style={{ marginTop: "2px" }}>
            {formik.errors.email}
          </div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.password && formik.errors.password
              ? "is-invalid"
              : ""
          }
        />
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmed Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "is-invalid"
              : ""
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="invalid-feedback">
            {formik.errors.confirmPassword}
          </div>
        )}

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? "is-invalid"
              : ""
          }
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
        )}

        <div className="button-box">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
