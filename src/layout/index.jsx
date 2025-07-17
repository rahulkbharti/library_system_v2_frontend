// MainLayout.jsx
import { Box, Grid, Stack } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { styled } from '@mui/material/styles';


const MainContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor:  theme.palette.background.default,
  minHeight: '100vh',
  padding: theme.spacing(3),
  width:"100%",
  overflowY: 'auto',
  paddingTop: "24px", // Adjust padding to account for the header height
  
}));

const MainLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Stack direction={"row"} sx={{height:"100vh"}}>
        <Sidebar open={false}/>
        <MainContentContainer>
           <Header/>
           <Outlet/>
        </MainContentContainer>
      </Stack>
    </div>
  );
};

export default MainLayout;