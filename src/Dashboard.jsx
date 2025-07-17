import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from 'styled-components';

const drawerWidth = 240;

const LayoutContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

const SidebarWrapper = styled(Box)`
  width: ${drawerWidth}px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1300;
  border-right: 1px solid #eee;
`;

const StyledAppBar = styled(AppBar)`
  width: calc(100% - ${drawerWidth}px);
  margin-left: ${drawerWidth}px;
  background-color: #fff;
  color: #000;
  box-shadow: none;
  border-bottom: 1px solid #eee;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  min-height: 64px;
`;

const SearchBar = styled(Box)`
  background: #f1f3f4;
  padding: 4px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  width: 300px;
`;

const SidebarMenu = styled(List)`
  margin-top: 64px; /* offset for header height */
`;

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Users', icon: <PeopleIcon /> },
    { text: 'Books', icon: <BookIcon /> },
    { text: 'Statistics', icon: <BarChartIcon /> }
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item, index) => (
        <ListItem button key={index} sx={{ px: 3 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </SidebarMenu>
  );
};

const Header = () => (
  <StyledAppBar position="fixed">
    <StyledToolbar>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Box>
      <SearchBar>
        <SearchIcon sx={{ color: 'gray', mr: 1 }} />
        <InputBase placeholder="Search..." fullWidth />
      </SearchBar>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">Arafat Hossain</Typography>
          <Avatar alt="Arafat Hossain" src="https://i.pravatar.cc/300" />
        </Box>
      </Box>
    </StyledToolbar>
  </StyledAppBar>
);

const Dashboard = () => {
  return (
    <LayoutContainer>
      <SidebarWrapper>
        <Box sx={{ height: '64px', borderBottom: '1px solid #eee' }} /> {/* spacer for header */}
        <Sidebar />
      </SidebarWrapper>

      <Box sx={{ flexGrow: 1, ml: `${drawerWidth}px` }}>
        <Header />
        <Box
          component="main"
          sx={{
            mt: '64px',
            p: 3,
            backgroundColor: '#f9f9f9',
            minHeight: '100vh'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Library Dashboard
          </Typography>
          <Typography variant="body1">
            Select a menu item from the sidebar to get started.
          </Typography>
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default Dashboard;
