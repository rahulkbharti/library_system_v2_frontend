import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Paper)`
  display: flex;
  width: 800px;
  height: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  background: url("https://images.unsplash.com/photo-1496307653780-42ee777d4833")
    no-repeat center center;
  background-size: cover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  min-width: auto;
  padding: 6px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  &::before {
    content: "✓";
    color: white;
    font-size: 40px;
    font-weight: bold;
  }
`;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      setResetEmail(values.email);
      
      // Simulate API request
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    },
  });

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (isSuccess) {
    return (
      <Wrapper>
        <Container>
          <ImageSection />
          <FormSection>
            <SuccessIcon />
            <Typography variant="h5" align="center" gutterBottom>
              Reset Email Sent!
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              We've sent a password reset link to <strong>{resetEmail}</strong>
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" mt={2}>
              Please check your inbox and follow the instructions to reset your password.
            </Typography>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackToLogin}
              >
                Back to Login
              </Button>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Typography variant="body2">
                Didn't receive the email?{" "}
                <Link 
                  href="#" 
                  underline="hover" 
                  color="primary"
                  onClick={() => {
                    setIsSuccess(false);
                    formik.resetForm();
                  }}
                >
                  Resend
                </Link>
              </Typography>
            </Box>
          </FormSection>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <ImageSection />
        <FormSection>
          {/* <BackButton onClick={handleBackToLogin}>
            <ArrowBackIcon />
          </BackButton> */}
          
          <Typography variant="h5" gutterBottom>
            Forgot Your Password?
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter your email and we'll send you a link to reset your password
          </Typography>

          <Box mt={3}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                size="small"
                label="Email"
                type="email"
                name="email"
                fullWidth
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              
              <Box mt={3}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </Box>
            </form>
            
            <Box mt={2} display="flex" justifyContent="center">
              <Typography variant="body2">
                Remember your password?{" "}
                <Link 
                  href="/login" 
                  underline="hover" 
                  color="primary"
                  onClick={handleBackToLogin}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </FormSection>
      </Container>
    </Wrapper>
  );
};

export default ForgetPaswordv_2;