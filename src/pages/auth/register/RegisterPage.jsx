import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Link,
  RadioGroup,
  Typography,
} from "@mui/material";
import LayoutAuth from "../LayoutAuth";
import { Box } from "@mui/system";
import { FormikProvider, useFormik } from "formik";
import FormInput from "../../common/FormInput";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth";
import registerSchema from "../../../schema/auth/registerSchema";
import axios from "axios";
import SearchBox from "../../common/SearchBox";
import React from "react";
const AUTH_URL = import.meta.env.VITE_API_URL;


const organizations = [
  { id: 101, name: "Google" },
  { id: 102, name: "Microsoft" },
];

const RoleRadioGroup = React.memo(({ value, onChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Role</FormLabel>
    <RadioGroup row name="role" value={value} onChange={onChange}>
      <FormControlLabel value="student" control={<Radio />} label="Student" />
      <FormControlLabel value="staff" control={<Radio />} label="Staff" />
      <FormControlLabel value="admin" control={<Radio />} label="Admin" />
    </RadioGroup>
  </FormControl>
));

const RegisterPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      organization_id: "",
      role: "student", // Default role
    },
    // validationSchema:registerSchema,
    onSubmit: async (values) => {
      const body = { ...values };
      delete body.confirm_password;

      if (values.role === "admin") {
        delete body.organization_id;
      }
      delete body.role;
      body.username = values.email.split("@")[0];
      console.log(body);
      try {
        const res = await axios.post(
          `${AUTH_URL}/auth/${values.role}/register`,
          body
        );
        alert("User Resitered Successfully");
        navigate("/login");
      } catch (err) {
        console.error("Error", err?.response?.data?.message);
        alert(err?.response?.data?.message);
      }
    },
  });
  return (
    <LayoutAuth
      coverImage={
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
      }
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" gutterBottom>
            {/* Welcome Back */}
            Library Management System
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Register as {formik.values.role.toUpperCase()}
          </Typography>
          <Box mt={2}>
            <RoleRadioGroup
              value={formik.values.role}
              onChange={formik.handleChange}
            />
          </Box>
          <Box mt={0}>
            {formik.values.role !== "admin" && (
              <SearchBox
                name="organization_id"
                label="Search Organization"
                options={organizations}
                getOptionLabel={(option) => option.name}
              />
            )}

            <Box display="flex" gap={2}>
              <FormInput name="first_name" label="Fist Name" />
              <FormInput name="last_name" label="Last Name" />
            </Box>
            {/* <Box display="flex" gap={2}>
              {formik.values.role === "student" && (
                <FormInput name="enrollment_number" label="Enrollment Number" />
              )}
              {formik.values.role !== "admin" && (
                <FormInput name="organization_id" label="Organization ID" />
              )}
            </Box> */}
            <FormInput name="email" label="Email" />
            <Box display="flex" gap={2}>
              <FormInput name="password" label="password" />
              <FormInput name="confirm_password" label="Confirm Password" />
            </Box>

            <Box mt={3}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign UP
              </Button>
              <Divider style={{ margin: "20px 0" }}>or</Divider>
              <GoogleAuth extraData={{ role: formik.values.role }}></GoogleAuth>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Typography variant="body2">
                Already have an account?
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  color="primary"
                >
                  Login Here
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </FormikProvider>
    </LayoutAuth>
  );
};

export default RegisterPage;
