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
import { Link as RouterLink} from "react-router-dom";
import GoogleAuth from "../GoogleAuth";
import loginSchema from "../../../schema/auth/loginSchema"; 
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../store/features/auth/authSlice";
const AUTH_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role :"student",
    },
    validationSchema:loginSchema,
    onSubmit: async (values) => {
      const body = {...values};
      delete body.role;
      try {
        const res = await axios.post(
          `${AUTH_URL}/auth/${values.role}/login`,
          body
        );
        alert("User Login Successfully");
        // console.log(res)
        dispatch(login(res.data));
      } catch (err) {
        console.error("Error", err?.response?.data?.message);
        alert(err?.response?.data?.message + " Check your Role");
      }
    },
  });
  return (
    <LayoutAuth coverImage={"https://images.unsplash.com/photo-1496307653780-42ee777d4833"}>
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
              <RadioGroup row aria-label="role" name="role" value={formik.values.role} onChange={formik.handleChange}>
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
                to="/forget-password"
                underline="hover"
                color="primary"
                variant="body2"
                component={RouterLink}
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
              <GoogleAuth extraData={{role:formik.values.role}}></GoogleAuth>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Typography variant="body2">
                Don't have an account?
                <Link component={RouterLink} to="/register" underline="hover" color="primary">
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

export default LoginPage;
