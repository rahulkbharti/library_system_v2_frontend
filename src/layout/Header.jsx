import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Business from '@mui/icons-material/Business';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Notification handlers
  const handleNotificationOpen = (e) => setNotificationAnchor(e.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);
  const markAllAsRead = () => {
    setNotifications(0);
    handleNotificationClose();
  };

  // Sample notification data
  const notificationItems = [
    {
      id: 1,
      text: "New book 'React Mastery' added to collection",
      time: "2 mins ago",
    },
    {
      id: 2,
      text: "Member registration request from John Doe",
      time: "1 hour ago",
    },
    {
      id: 3,
      text: "System maintenance scheduled for tonight",
      time: "3 hours ago",
    },
  ];

  const userData = useSelector((state) => state.auth.login_data.userData);
  //   console.log(userData);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    // Optionally redirect to login page
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        py: 0,
        px: 3,
        // backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Welcome back, {userData?.first_name?.charAt(0).toUpperCase() + userData?.first_name?.slice(1)} {userData?.last_name?.charAt(0).toUpperCase() + userData?.last_name?.slice(1)} !
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search books, members..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 4,
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
              "& fieldset": { border: "none" },
              width: 250,
            },
          }}
        />

        {/* Notification Button with Popup */}
        <IconButton
          onClick={handleNotificationOpen}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.03)",
            borderRadius: 2,
            p: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.06)",
            },
          }}
        >
          <Badge badgeContent={notifications} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 380,
              maxHeight: 450,
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Notifications
            </Typography>
            {notifications > 0 && (
              <Typography
                variant="caption"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={markAllAsRead}
              >
                Mark all as read
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 0 }} />

          <List sx={{ p: 0 }}>
            {notificationItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  py: 1.5,
                  px: 2,
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.03)" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <CheckCircleIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary={item.time}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{
                    variant: "caption",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            ))}
          </List>

          {notificationItems.length === 0 && (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <NotificationsIcon sx={{ fontSize: 40, opacity: 0.3 }} />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                No notifications
              </Typography>
            </Box>
          )}
        </Menu>

        {/* Profile Menu */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar
            alt={userData?.first_name}
            src={userData?.picture}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #fff",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              },
            }}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              alt={userData?.first_name}
              src={userData?.picture}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {userData?.first_name?.charAt(0).toUpperCase() + userData?.first_name?.slice(1)} {userData?.last_name?.charAt(0).toUpperCase() + userData?.last_name?.slice(1)} {userData?.role!= "admin" && (`(ORG${userData?.organization_id
})`)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {userData?.role?.charAt(0).toUpperCase() + userData?.role?.slice(1)} {userData?.email ? `(${userData?.email})` : ""} 
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Link to="/profile">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">My Profile</Typography>
            </MenuItem>
          </Link>

          <Link to="/setting">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
          </Link>
          <Link to="/help">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Help Center</Typography>
            </MenuItem>
          </Link>
          {userData?.role == "admin" && (
            <Link to="/organization">
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Business fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2">Organizations </Typography>
              </MenuItem>
            </Link>
          )}

          <Divider sx={{ my: 1 }} />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2" color="error">
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
