import React, { useState, useEffect } from "react";
import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography,
  Collapse,
  styled,
  Avatar,
  useTheme
} from "@mui/material";
import { 
  Dashboard as DashboardIcon,
  LibraryBooks as LibraryIcon,
  Book as BookIcon,
  CopyAll as CopiesIcon,
  EventSeat as SeatsIcon,
  CalendarToday as ReservationsIcon,
  People as UsersIcon,
  School as StudentIcon,
  Work as StaffIcon,
  AdminPanelSettings as AdminIcon,
  Business as OrganizationIcon,
  Lock as RolesIcon,
  Groups as GroupsIcon,
  Security as PermissionsIcon,
  AttachMoney as FeesIcon,
  Receipt as PaymentsIcon,
  ExitToApp as LogoutIcon,
  ExpandLess,
  ExpandMore
} from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  width: "100%",
  
  /* ACTIVE STATE STYLES */
  "&.active": {
    "& .MuiListItemButton-root": {
      backgroundColor: theme.palette.primary.main,
      borderLeft: `4px solid ${theme.palette.primary.dark}`,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.light,
      },
      "& .MuiListItemText-primary": {
        color: theme.palette.common.white,
        fontWeight: "bold",
      },
      /* HOVER STATE WHEN ACTIVE */
      "&:hover": {
        backgroundColor: theme.palette.primary.main, // Slightly lighter when hovering active item
      }
    }
  },
  
  /* HOVER STATE STYLES (for non-active items) */
  "&:hover:not(.active)": {
    "& .MuiListItemButton-root": {
      backgroundColor: theme.palette.action.hover,
      "& .MuiListItemText-primary": {
        color: theme.palette.common.main,
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.text.main,
      }
    }
  }
}));

const menuItems = [
  { 
    id: "Dashboard",
    icon: <DashboardIcon />, 
    label: "Dashboard", 
    link: "/",
  },
  { 
    id: "library",
    icon: <LibraryIcon />, 
    label: "Library Management", 
    link: "/library-management",
    subItems: [
      { icon: <BookIcon />, label: "Books Management", link: "/library-management/books" },
      { icon: <CopiesIcon />, label: "Book Copies", link: "/library-management/copies" },
      { icon: <SeatsIcon />, label: "Seats", link: "/library-management/seats" },
      { icon: <ReservationsIcon />, label: "Seat Reservations", link: "/library-management/reservations" },
    ] 
  },
  { 
    id: "users",
    icon: <UsersIcon />, 
    label: "User and Accounts", 
    link: "/users",
    subItems: [
      { icon: <StudentIcon />, label: "Students", link: "/users/students" },
      { icon: <StaffIcon />, label: "Staffs", link: "/users/staffs" },
      { icon: <AdminIcon />, label: "Admins", link: "/users/admins" },
    ] 
  },
  { 
    id: "roles",
    icon: <RolesIcon />, 
    label: "Roles and Permissions", 
    link: "/roles",
    subItems: [
      { icon: <GroupsIcon />, label: "Groups", link: "/roles/groups" },
      { icon: <PermissionsIcon />, label: "Group Permissions", link: "/roles/permissions" },
    ] 
  },
  { 
    id: "fees",
    icon: <FeesIcon />, 
    label: "Fees and Payment", 
    link: "/fees",
    subItems: [
      { icon: <FeesIcon />, label: "Fees", link: "/fees/fees" },
      { icon: <PaymentsIcon />, label: "Student Fees", link: "/fees/student-fees" },
      { icon: <PaymentsIcon />, label: "Payments", link: "/fees/payments" },
    ] 
  },
];

const secondaryItems = [
  { 
    id: "organization",
    icon: <OrganizationIcon />, 
    label: "Organization", 
    link: "/organization",
  },
  { icon: <LogoutIcon />, label: "Logout", link: "/logout" },
];

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Auto-expand menus based on current route
  useEffect(() => {
    const newExpandedMenus = {};
    
    menuItems.forEach(item => {
      if (item.subItems) {
        const isActive = location.pathname.startsWith(item.link) || 
                         item.subItems.some(subItem => location.pathname.startsWith(subItem.link));
        if (isActive) {
          newExpandedMenus[item.id] = true;
        }
      }
    });
    
    setExpandedMenus(newExpandedMenus);
  }, [location.pathname]);

  const handleMenuToggle = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const isActive = (path, subItems = []) => {
    const currentPath = location.pathname;
    if (currentPath === path) return true;
    return subItems.some(item => currentPath.startsWith(item.link));
  };

  return (
    <Box sx={{ 
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      width: 350,
      py: 2,
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
    }}>
      {/* Logo/Brand Area */}
      <Box sx={{ 
        px: 3, 
        py: 2, 
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2
      }}>
        <Avatar 
          sx={{ 
            width: 40, 
            height: 40,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText
          }}
        >
          <LibraryIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary,
            lineHeight: 1.2
          }}>
            LibraryPro
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Management System
          </Typography>
        </Box>
      </Box>
      
      {/* Main Navigation */}
      <List sx={{ px: 1, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isItemActive = isActive(item.link, item.subItems);
          
          return (
            <React.Fragment key={item.id}>
              <StyledNavLink to={item.link}>
                <ListItemButton
                  onClick={() => {
                    if (item.subItems) {
                      handleMenuToggle(item.id);
                    }
                    navigate(item.link);
                  }}
                  sx={{
                    py: 1.1,
                    // px: 2,
                    mb: 0.5,
                    borderRadius: "6px",
                    mx: 1,
                    minHeight: 48,
                    backgroundColor: isItemActive ? theme.palette.primary.dark : theme.palette.primary.light,
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0,
                      mr: 2,
                      justifyContent: "center",
                      color: isItemActive ? theme.palette.primary.light : theme.palette.text.primary
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ 
                      fontSize: 14, 
                      fontWeight: isItemActive ? "bold" : "medium",
                      color: isItemActive ? theme.palette.common.white : "inherit"
                    }}
                  />
                  {item.subItems && (
                    expandedMenus[item.id] ? 
                    <ExpandLess fontSize="small" sx={{ color: theme.palette.text.primary }} /> : 
                    <ExpandMore fontSize="small" sx={{ color: theme.palette.text.primary }} />
                  )}
                </ListItemButton>
              </StyledNavLink>
              
              {item.subItems && (
                <Collapse in={expandedMenus[item.id]} timeout="auto" unmountOnExit sx={{pl:2,overflow: "hidden"}}>
                  <List component="div" disablePadding sx={{p:0,mb:1, backgroundColor : theme.palette.background.default ,borderRadius:"6px"}}>
                    {item.subItems.map((subItem) => {
                      const isSubItemActive = location.pathname.startsWith(subItem.link);
                      
                      return (
                        <StyledNavLink to={subItem.link} key={subItem.label}>
                          <ListItemButton
                            sx={{
                              py: 1,
                              // pl: 6,
                              // pr: 2,
                              mb: 0.5,
                              borderRadius: "6px",
                              mx: 1,
                              backgroundColor: isSubItemActive ? theme.palette.primary.light : "transparent",
                            }}
                          >
                            <ListItemIcon 
                              sx={{ 
                                minWidth: 0,
                                mr: 2,
                                justifyContent: "center",
                                color: isSubItemActive ? theme.palette.primary.light : theme.palette.text.primary
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.label}
                              primaryTypographyProps={{ 
                                fontSize: 13, 
                                fontWeight: isSubItemActive ? "bold" : "medium",
                                color: isSubItemActive ? theme.palette.common.white : "inherit"
                              }}
                            />
                          </ListItemButton>
                        </StyledNavLink>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
      
      <Divider sx={{ 
        my: 1, 
        backgroundColor: theme.palette.divider 
      }} />
      
      {/* Secondary Navigation */}
      <List sx={{ px: 1 }}>
        {secondaryItems.map((item) => (
          <StyledNavLink to={item.link} key={item.label}>
            <ListItemButton
              sx={{
                py: 1.1,
                px: 2,
                mb: 0.5,
                borderRadius: "6px",
                mx: 1,
                minHeight: 48,
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 0,
                  mr: 2,
                  justifyContent: "center",
                  color: theme.palette.text.primary
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ 
                  fontSize: 14, 
                  fontWeight: "medium",
                  color: "inherit"
                }}
              />
            </ListItemButton>
          </StyledNavLink>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;