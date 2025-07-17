import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

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
  height: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  background: url('https://images.unsplash.com/photo-1496307653780-42ee777d4833') no-repeat center center;
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
`;

const GoogleButton = styled(Button)`
  text-transform: none;
  margin-top: 20px;
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
  }
`;

const Login = () => {
  return (
    <Wrapper>
      <Container>
        <ImageSection />
        <FormSection>
          <Typography variant="h5" gutterBottom>
            {/* Welcome Back */}
            Library Management System
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sign in to your account
          </Typography>

          <Box mt={3}>
            <TextField size='small' label="Email" type="email" fullWidth margin="normal" />
            <TextField size='small' label="Password" type="password" fullWidth margin="normal" />
            <Box display="flex" justifyContent="flex-end">
              <Link href="#" underline="hover" color="primary" variant="body2">
                Forgot Password?
              </Link>
            </Box>

            <Box mt={3}>
              <Button size='small' variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
              <Divider style={{ margin: '20px 0' }}>or</Divider>
              <GoogleButton size='small' variant="contained" startIcon={<GoogleIcon />} fullWidth>
                Sign in with Google
              </GoogleButton>
            </Box>
          </Box>
        </FormSection>
      </Container>
    </Wrapper>
  );
};

export default Login;
