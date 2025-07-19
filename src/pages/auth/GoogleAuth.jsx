import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/features/auth/authSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import styled from "styled-components";
import { useState } from "react";
import SearchBox from "../common/AutoComplete"; // simple autocomplete without Formik
const AUTH_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const GoogleButton = styled(Button)`
  text-transform: none;
  margin-top: 20px;
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
  }
`;

const GoogleAuth = ({ extraData }) => {
  const dispatch = useDispatch();
  const [orgDialogOpen, setOrgDialogOpen] = useState(false);
  const [orgId, setOrgId] = useState("");

  const organizations = [
    { name: "Library Kahotri", id: 101 },
    { name: "Library Jargo", id: 102 },
  ];

  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const body = {
        access_token: tokenResponse.access_token,
        organization_id: orgId,
        ...extraData,
      };

      // console.log("Form data", body);
      try {
        const res = await axios.post(`${AUTH_URL}/auth/google/continue`, body);
        dispatch(login(res.data));
        alert(`Welcome ${res.data?.userData?.first_name} ${res?.data?.userData?.last_name}!`);
      } catch (error) {
        // console.error("Error sending token to backend:", error.response);
        alert(error?.response?.data?.message || "Login failed. Please try again.");
      }
      setOrgDialogOpen(false);
    },
    onError: (err) => {
      console.error("Google Login Failed", err);
    },
    scope: "openid email profile",
  });

  const handleContinue = () => {
    setOrgDialogOpen(false);
    if (!orgId) {
      alert("Please select an organization first.");
      return;
    }
    googleAuth();
  };
  
  const handleAuth = ()=>{
    if(extraData.role !== "admin"){
        setOrgDialogOpen(true);
    }else{
         googleAuth();
    }
  }
  return (
    <>
      <Dialog open={orgDialogOpen} onClose={() => setOrgDialogOpen(false)}>
        <DialogTitle>Please select an Organization</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <SearchBox
            value={orgId}
            setOrgId={setOrgId}
            options={organizations}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrgDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </DialogActions>
      </Dialog>

      <GoogleButton
        variant="contained"
        startIcon={<GoogleIcon />}
        fullWidth
        size="small"
        onClick={handleAuth}
      >
        Continue with Google
      </GoogleButton>
    </>
  );
};

export default GoogleAuth;
