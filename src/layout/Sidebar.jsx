import { useState, useEffect, useMemo, memo } from "react";
import { 
  Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography,
  Collapse, styled, Avatar, useTheme
} from "@mui/material";

import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryIcon from '@mui/icons-material/LibraryBooks';
import UsersIcon from '@mui/icons-material/People';
import RolesIcon from '@mui/icons-material/Lock';
import FeesIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import OrganizationIcon from '@mui/icons-material/Business';


import { NavLink, useLocation } from "react-router-dom";

// --- Data Configuration (No changes here) ---
const menuItems = [
    { id: "Dashboard", icon: <DashboardIcon />, label: "Dashboard", link: "/" },
    { id: "library", icon: <LibraryIcon />, label: "Library Management", 
      subItems: [
        { label: "Books Management", link: "/library-management/books" },
        { label: "Book Copies", link: "/library-management/copies" },
        { label: "Seats", link: "/library-management/seats" },
        { label: "Seat Reservations", link: "/library-management/reservations" },
      ] 
    },
    { id: "users", icon: <UsersIcon />, label: "User and Accounts", 
      subItems: [
        { label: "Students", link: "/users/students" },
        { label: "Staffs", link: "/users/staffs" },
        // { label: "Admins", link: "/users/admins" },
      ] 
    },
    { id: "roles", icon: <RolesIcon />, label: "Roles and Permissions", 
      subItems: [
        { label: "Groups", link: "/roles/groups" },
        { label: "Group Permissions", link: "/roles/permissions" },
      ] 
    },
    { id: "fees", icon: <FeesIcon />, label: "Fees and Payment", 
      subItems: [
        { label: "Fees", link: "/fees/fees" },
        { label: "Student Fees", link: "/fees/student-fees" },
        { label: "Payments", link: "/fees/payments" },
      ] 
    },
];

const secondaryItems = [
  // { id: "organization", icon: <OrganizationIcon />, label: "Organization", link: "/organization" },
  // { id: "logout", icon: <LogoutIcon />, label: "Logout", link: "/logout" },
];

// --- Styled Components (Changes are here) ---
const StyledListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  margin: theme.spacing(0.25, 1), // CHANGED: Reduced vertical margin
  padding: theme.spacing(0.8, 1.5), // CHANGED: Reduced padding
  borderRadius: theme.shape.borderRadius,
  minHeight: 44, // CHANGED: Reduced min-height
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: theme.spacing(1.5), // CHANGED: Reduced icon margin
    justifyContent: "center",
    color: 'inherit',
  },
  
  '& .MuiListItemText-primary': {
    fontSize: '0.9rem', // CHANGED: Slightly smaller main menu text
    fontWeight: active ? 600 : 500,
  },

  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.action.hover,
  },
}));

const StyledSubListItem = styled(StyledListItem)(({ theme, active }) => ({
  padding: theme.spacing(0.5, 1.5), // CHANGED: Reduced sub-item padding
  paddingLeft: theme.spacing(3), // CHANGED: Adjusted left indent
  minHeight: 38, // CHANGED: Reduced sub-item min-height
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  
  '&::before': {
    content: '"•"',
    display: 'block',
    marginRight: theme.spacing(1.5),
    color: active ? theme.palette.primary.main : theme.palette.text.disabled,
    fontSize: '1.2rem',
    transition: 'color 0.2s ease-in-out',
  },
  
  '&:hover': {
    backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    '&::before': {
      color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    }
  },
}));

// --- Reusable Menu Item Component (Changes are here) ---
const MenuItem = memo(({ item }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isParentActive = useMemo(() => 
    item.subItems?.some(sub => pathname.startsWith(sub.link)) || false,
    [pathname, item.subItems]
  );
  
  useEffect(() => {
    if (isParentActive) setOpen(true);
  }, [isParentActive]);

  if (!item.subItems) {
    return (
      <NavLink to={item.link} style={{ textDecoration: 'none' }}>
        <StyledListItem active={pathname === item.link}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
        </StyledListItem>
      </NavLink>
    );
  }

  return (
    <>
      <StyledListItem active={isParentActive} onClick={() => setOpen(!open)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subItems.map(subItem => (
            <NavLink to={subItem.link} key={subItem.link} style={{ textDecoration: 'none' }}>
              <StyledSubListItem active={pathname.startsWith(subItem.link)}>
                {/* CHANGED: Explicitly set smaller font size for sub-menu text */}
                <ListItemText 
                  primary={subItem.label} 
                  primaryTypographyProps={{ style: { fontSize: '0.85rem' } }} 
                />
              </StyledSubListItem>
            </NavLink>
          ))}
        </List>
      </Collapse>
    </>
  );
});

// --- Main Sidebar Component (Changes are here) ---
const Sidebar = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: "flex", flexDirection: "column",
      width: 350, height: "100vh",
      py: 1, backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
    }}>
      {/* Logo Area */}
      <Box sx={{ p: 2, mb: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
          <LibraryIcon />
        </Avatar>
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                LibraryPro
            </Typography>
            {/* CHANGED: Added Slogan/Subtitle */}
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                library pro Api
            </Typography>
        </Box>
      </Box>
      
      {/* Main Navigation */}
      <List sx={{ px: 1, flexGrow: 1 }}>
        {menuItems.map((item) => <MenuItem key={item.id} item={item} />)}
      </List>
      
      <Divider sx={{ my: 1 }} />
      
      {/* Secondary Navigation */}
      <List sx={{ px: 1 }}>
        {secondaryItems.map((item) => <MenuItem key={item.id} item={item} />)}
      </List>
    </Box>
  );
};

export default memo(Sidebar);