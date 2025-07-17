import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider
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
  width: 900px;
  height: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  background: url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4') no-repeat center center;
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

const Register = () => {
  const [role, setRole] = useState('student');

  const handleTabChange = (event, newValue) => {
    setRole(newValue);
  };

  return (
    <Wrapper>
      <Container>
        <ImageSection />
        <FormSection>
          <Typography variant="h5" gutterBottom>
            Register as {role.charAt(0).toUpperCase() + role.slice(1)}
          </Typography>
          <Tabs value={role} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab size='small' label="Student" value="student" />
            <Tab size='small' label="Librarian" value="librarian" />
          </Tabs>

          <Box mt={3}>
            <TextField size='small' label="Full Name" fullWidth margin="normal" />
            <TextField size='small' label="Email" type="email" fullWidth margin="normal" />
            <TextField size='small' label="Password" type="password" fullWidth margin="normal" />
            {/* {role === 'student' && (
              <TextField label="Department" fullWidth margin="normal" />
            )} */}
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth>
                Register
              </Button>
              <Divider style={{ margin: '20px 0' }}>or</Divider>
              <GoogleButton variant="contained" startIcon={<GoogleIcon />} fullWidth>
                Sign up with Google
              </GoogleButton>
            </Box>
          </Box>
        </FormSection>
      </Container>
    </Wrapper>
  );
};

export default Register;
