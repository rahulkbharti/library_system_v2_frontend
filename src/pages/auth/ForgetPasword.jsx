import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  CircularProgress,
  IconButton,
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

const OTPContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const OTPInput = styled(TextField)`
  width: 55px;
  input {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
`;

const ResendLink = styled(Link)`
  cursor: pointer;
  margin-top: 10px;
  display: inline-block;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm password is required"),
  });

  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      setResetEmail(values.email);
      
      // Simulate API request to send OTP
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(2);
        startCountdown();
      }, 1500);
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      
      // Simulate password reset API request
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
      }, 1500);
    },
  });

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendOTP = () => {
    if (countdown === 0) {
      setIsSubmitting(true);
      // Simulate API request to resend OTP
      setTimeout(() => {
        setIsSubmitting(false);
        startCountdown();
      }, 1000);
    }
  };

  const verifyOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate OTP verification API request
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1000);
  };

  // Step 1: Enter email
  if (step === 1) {
    return (
      <Wrapper>
        <Container>
          <ImageSection />
          <FormSection>
            
            <Typography variant="h5" gutterBottom>
              Forgot Your Password?
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Enter your email to receive a verification code
            </Typography>

            <Box mt={3}>
              <form onSubmit={emailForm.handleSubmit}>
                <TextField
                  size="small"
                  label="Email"
                  type="email"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={emailForm.values.email}
                  onChange={emailForm.handleChange}
                  onBlur={emailForm.handleBlur}
                  error={emailForm.touched.email && Boolean(emailForm.errors.email)}
                  helperText={emailForm.touched.email && emailForm.errors.email}
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
                      "Send Verification Code"
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
  }

  // Step 2: Verify OTP
  if (step === 2) {
    return (
      <Wrapper>
        <Container>
          <ImageSection />
          <FormSection>
            <Typography variant="h5" gutterBottom>
              Verify Your Identity
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              We sent a 6-digit code to <strong>{resetEmail}</strong>
            </Typography>

            <Box mt={3}>
              <OTPContainer>
                {otp.map((digit, index) => (
                  <OTPInput
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputProps={{ maxLength: 1 }}
                    variant="outlined"
                  />
                ))}
              </OTPContainer>
              
              <Box display="flex" justifyContent="center" mt={1}>
                <Typography variant="body2" color="textSecondary">
                  {countdown > 0 ? `Resend code in ${countdown}s` : "Didn't receive the code?"}
                </Typography>
                <ResendLink 
                  underline="hover" 
                  color="primary"
                  onClick={resendOTP}
                  disabled={countdown > 0 || isSubmitting}
                >
                  {countdown > 0 ? "" : "Resend"}
                </ResendLink>
              </Box>
              
              <Box mt={3}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={verifyOTP}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </Box>
            </Box>
          </FormSection>
        </Container>
      </Wrapper>
    );
  }

  // Step 3: Set New Password
  if (step === 3) {
    return (
      <Wrapper>
        <Container>
          <ImageSection />
          <FormSection>
            <Typography variant="h5" gutterBottom>
              Create New Password
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Your new password must be different from previous passwords
            </Typography>

            <Box mt={3}>
              <form onSubmit={passwordForm.handleSubmit}>
                <TextField
                  size="small"
                  label="New Password"
                  type="password"
                  name="password"
                  fullWidth
                  margin="normal"
                  value={passwordForm.values.password}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
                  error={passwordForm.touched.password && Boolean(passwordForm.errors.password)}
                  helperText={passwordForm.touched.password && passwordForm.errors.password}
                />
                
                <TextField
                  size="small"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  margin="normal"
                  value={passwordForm.values.confirmPassword}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
                  error={passwordForm.touched.confirmPassword && Boolean(passwordForm.errors.confirmPassword)}
                  helperText={passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword}
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
                      "Reset Password"
                    )}
                  </Button>
                </Box>
              </form>
            </Box>
          </FormSection>
        </Container>
      </Wrapper>
    );
  }

  // Step 4: Success
  return (
    <Wrapper>
      <Container>
        <ImageSection />
        <FormSection>
          <SuccessIcon />
          <Typography variant="h5" align="center" gutterBottom>
            Password Reset Successful!
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            Your password has been successfully reset
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
        </FormSection>
      </Container>
    </Wrapper>
  );
};

export default ForgotPasswordPage;