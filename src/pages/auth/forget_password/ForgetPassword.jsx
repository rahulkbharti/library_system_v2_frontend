import { useState } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import LayoutAuth from "../LayoutAuth";
import { FormikProvider, useFormik } from "formik";
import { Box, color, display } from "@mui/system";
import FormInput from "../../common/FormInput";
import { Link } from "react-router-dom";
import axios from "axios";
const AUTH_URL = import.meta.env.VITE_API_URL;

const ResetPasswordPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otpId, setOtpId] = useState("");

  const steps = ["Enter Email", "Verify OTP", "New Password", "Result"];

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError("");
        // Simulate API call to send OTP
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await axios.post(
          `${AUTH_URL}/auth/forgot-password/send-otp`,
          values
        );
        // console.log(res);
        setOtpId(res.data.otpId);
        setEmail(values.email);
        setActiveStep(1);
      } catch (err) {
        setError("Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
      otpId: "",
      email: "",
    },
    onSubmit: async (values) => {
      const body = { ...values };
      body.otpId = otpId;
      body.email = email;
      try {
        setLoading(true);
        setError("");
        // Simulate OTP verification
        const res = await axios.post(
          `${AUTH_URL}/auth/forgot-password/verify-otp`,
          body
        );
        console.log(res);
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // if (values.otp !== "123456") {
        //   // Replace with actual OTP verification
        //   throw new Error("Invalid OTP");
        // }
        setResetToken(res.data.resetToken);
        setActiveStep(2);
      } catch (err) {
        setError(err.message || "OTP verification failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    // validate: (values) => {
    //   const errors = {};
    //   if (!values.newPassword) {
    //     errors.newPassword = "Required";
    //   } else if (values.newPassword.length < 8) {
    //     errors.newPassword = "Password must be at least 8 characters";
    //   }
    //   if (values.newPassword !== values.confirmPassword) {
    //     errors.confirmPassword = "Passwords do not match";
    //   }
    //   return errors;
    // },
    onSubmit: async (values) => {
      const body = { ...values };
      delete body.confirmPassword;
      body.resetToken = resetToken;
      try {
        setLoading(true);
        setError("");
        // Simulate password reset API call
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(body);
        const res = await axios.post(
          `${AUTH_URL}/auth/forgot-password/reset-password`,
          body
        );
        console.log(res);
        setSuccess("Password reset successfully!");
        setActiveStep(3);
      } catch (err) {
        setError("Failed to reset password. Please try again.");
        console.error("Error resetting password:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError("");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormikProvider value={emailFormik}>
            <form onSubmit={emailFormik.handleSubmit}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Enter your email to receive a verification code
              </Typography>
              <Box mt={2}>
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : "Send OTP"}
                </Button>
              </Box>
            </form>
          </FormikProvider>
        );
      case 1:
        return (
          <FormikProvider value={otpFormik}>
            <form onSubmit={otpFormik.handleSubmit}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                We sent a verification code to {email}. Please enter it below.
              </Typography>
              <Box mt={2}>
                <FormInput
                  name="otp"
                  label="Verification Code"
                  type="text"
                  fullWidth
                  required
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button onClick={handleBack} disabled={loading}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Verify"}
                </Button>
              </Box>
            </form>
          </FormikProvider>
        );
      case 2:
        return (
          <FormikProvider value={passwordFormik}>
            <form onSubmit={passwordFormik.handleSubmit}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Create a new password for your account
              </Typography>
              <Box mt={2}>
                <FormInput
                  name="newPassword"
                  label="New Password"
                  type="password"
                  fullWidth
                  required
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  required
                />
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button onClick={handleBack} disabled={loading}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Reset Password"}
                </Button>
              </Box>
            </form>
          </FormikProvider>
        );
      case 3:
        return (
          <Box>
            {success ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error || "Password reset failed"}
              </Alert>
            )}
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              fullWidth
            >
              Go to Login Page
            </Button>
          </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <LayoutAuth
      coverImage={
        "https://images.unsplash.com/photo-1496307653780-42ee777d4833"
      }
    >
      <Typography variant="h5" gutterBottom>
        Library Management System
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Reset Password
      </Typography>

      <Box sx={{ width: "100%", mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {error && activeStep !== 3 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {renderStepContent(activeStep)}

      <Link
        to="/login"
        style={{ textDecoration: "none" }}
        sx={{
          color: "primary.main",
          mt: 3,
          display: "block",
          textAlign: "center",
        }}
      >
        Login
      </Link>
    </LayoutAuth>
  );
};

export default ResetPasswordPage;
