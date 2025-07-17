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
import LayoutAuth from "./LayoutAuth";
import { Box } from "@mui/system";
import { FormikProvider, useFormik } from "formik";
import FormInput from "../common/FormInput";
// import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const LoginPage_v2 = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });
  return (
    <LayoutAuth bg={""}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" gutterBottom>
            {/* Welcome Back */}
            Library Management System
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sign in to your account
          </Typography>
          <Box mt={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup row aria-label="role" name="role">
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="staff"
                  control={<Radio />}
                  label="Staff"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={0}>
            <FormInput name="email" label="Email" />
            <FormInput name="password" label="Password" />
            <Box display="flex" justifyContent="flex-end">
              <Link
                href="/forget-password"
                underline="hover"
                color="primary"
                variant="body2"
              >
                Forgot Password?
              </Link>
            </Box>
            <Box mt={3}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign In
              </Button>
              <Divider style={{ margin: "20px 0" }}>or</Divider>
              <GoogleAuth></GoogleAuth>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link href="/register" underline="hover" color="primary">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </FormikProvider>
    </LayoutAuth>
  );
};

export default LoginPage_v2;
