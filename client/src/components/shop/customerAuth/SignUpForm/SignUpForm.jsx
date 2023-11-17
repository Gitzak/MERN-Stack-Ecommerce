import { useFormik } from "formik";
import * as yup from "yup";
import { RegisterCustomer } from "../../../../api/customerApi";
import "./SignUpForm.css";
import { Button, TextField } from "@mui/material";

const SignUpForm = () => {
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
    // phoneNumber: yup
    //   .string()
    //   .matches(/^[0-9]+$/, "Invalid phone number")
    //   .required("Phone Number is required"),
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
      console.log(values);

    try {
        const newCustomer = await RegisterCustomer(values)

        console.log(newCustomer)

    } catch (error) {
        console.log(error.message)
    }
    },
  });

  return (
    <div className="sign-up-container">
      <h2>Dont't Have an account</h2>
      <span>Sign Up with your email and Password</span>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          margin="normal"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="normal"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
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
        <TextField
          fullWidth
          label="Confirmed Password"
          name="confirmPassword"
          margin="normal"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          margin="normal"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#e3a346", padding: "5px 20px" }}
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
