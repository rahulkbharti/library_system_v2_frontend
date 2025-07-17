import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, TextField, MenuItem, Select, InputLabel,
  FormControl, Grid, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Chip, IconButton, Stack, Dialog,
  DialogTitle, DialogContent, DialogActions, Tooltip, Avatar, Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  PersonAdd as AddIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  VerifiedUser as AdminIcon,
  Group as GroupIcon,
  Person as MemberIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  PersonPin as RoleIcon
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import StatusOverview from '../common/StatusOverview';

// Styled Components
const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
  color: 'white',
  padding: theme.spacing(4, 0),
  borderRadius: '0 0 20px 20px',
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(58, 28, 113, 0.3)',
}));

const StatusBadge = styled(Chip)(({ theme, status }) => {
  return status === 'active'
    ? { backgroundColor: '#4caf5020', color: '#4caf50', fontWeight: 600 }
    : { backgroundColor: '#f4433620', color: '#f44336', fontWeight: 600 };
});

const RoleBadge = styled(Chip)(({ theme, role }) => {
  let color;
  switch (role) {
    case 'admin': color = '#9c27b0'; break;
    case 'librarian': color = '#2196f3'; break;
    default: color = '#ff9800';
  }

  return {
    backgroundColor: `${color}20`,
    color: color,
    fontWeight: 600,
  };
});

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '12px',
  padding: '8px 16px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Mock data
const initialUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@library.com',
    role: 'admin',
    status: 'active',
    phone: '+1 (555) 123-4567',
    joinDate: new Date(2022, 0, 15),
    lastLogin: new Date(2023, 5, 22, 14, 30)
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@library.com',
    role: 'librarian',
    status: 'active',
    phone: '+1 (555) 987-6543',
    joinDate: new Date(2022, 3, 10),
    lastLogin: new Date(2023, 5, 21, 9, 15)
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@library.com',
    role: 'member',
    status: 'active',
    phone: '+1 (555) 456-7890',
    joinDate: new Date(2022, 5, 22),
    lastLogin: new Date(2023, 5, 20, 16, 45)
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@library.com',
    role: 'member',
    status: 'inactive',
    phone: '+1 (555) 321-6547',
    joinDate: new Date(2022, 7, 5),
    lastLogin: new Date(2023, 4, 10, 11, 20)
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@library.com',
    role: 'librarian',
    status: 'active',
    phone: '+1 (555) 654-1238',
    joinDate: new Date(2022, 9, 18),
    lastLogin: new Date(2023, 5, 22, 8, 0)
  },
  {
    id: 6,
    name: 'Jennifer Taylor',
    email: 'jennifer@library.com',
    role: 'member',
    status: 'inactive',
    phone: '+1 (555) 789-0123',
    joinDate: new Date(2023, 0, 30),
    lastLogin: new Date(2023, 2, 15, 13, 40)
  },
  {
    id: 7,
    name: 'Robert Martinez',
    email: 'robert@library.com',
    role: 'member',
    status: 'active',
    phone: '+1 (555) 234-5678',
    joinDate: new Date(2023, 2, 12),
    lastLogin: new Date(2023, 5, 21, 17, 30)
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa@library.com',
    role: 'admin',
    status: 'active',
    phone: '+1 (555) 876-5432',
    joinDate: new Date(2021, 11, 1),
    lastLogin: new Date(2023, 5, 22, 10, 15)
  },
];

const roles = ['admin', 'librarian', 'member'];
const statuses = ['active', 'inactive'];

const UsersPage = () => {
  // State management
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dialogType, setDialogType] = useState('add'); // 'add', 'view', 'edit'
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'member',
    phone: '',
    status: 'active'
  });

  // Apply filters and sorting
  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(result);
    setPage(0);
  }, [searchTerm, roleFilter, statusFilter, users]);

  // Handle user deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Handle status toggle
  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  // Handle dialog open
  const handleOpenDialog = (type, user = null) => {
    setDialogType(type);
    setCurrentUser(user);

    if (type === 'add') {
      setNewUser({
        name: '',
        email: '',
        role: 'member',
        phone: '',
        status: 'active'
      });
    }

    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (dialogType === 'add') {
      setNewUser({ ...newUser, [name]: value });
    } else {
      setCurrentUser({ ...currentUser, [name]: value });
    }
  };

  // Handle form submission (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (dialogType === 'add') {
      // Add new user
      const newUserWithId = {
        ...newUser,
        id: users.length + 1,
        joinDate: new Date(),
        lastLogin: new Date()
      };
      setUsers([...users, newUserWithId]);
    } else {
      // Edit existing user
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    }

    handleCloseDialog();
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Get avatar color based on user role
  const getAvatarColor = (role) => {
    switch (role) {
      case 'admin': return '#9c27b0';
      case 'librarian': return '#2196f3';
      default: return '#ff9800';
    }
  };

  const status = [
    {
      title: "Total Users",
      value: 500,
      color: "#3a1c71",
      icon: <GroupIcon />
    },
    {
      title: "Active Users",
      value: 500,
      color: "#d76d77",
      icon: <UnlockIcon />
    },
    {
      title: "Administrators",
      value: 500,
      color: "#ffaf7b",
      icon: <AdminIcon />
    },
    {
      title: "New This Month",
      value: 500,
      color: "#9c27b0",
      icon: <AdminIcon />
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h6" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
          User Management
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ActionButton
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            sx={{
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
            }}
          >
            Add New User
          </ActionButton>
        </motion.div>
      </Box>
      <>
        {/* Stats */}
        <StatusOverview status={status} />

        {/* Search and Filter Bar */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search users by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  {roles.map(role => (
                    <MenuItem key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(!showFilters)}
                endIcon={showFilters ? <CloseIcon fontSize="small" /> : null}
              >
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </Button>
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Join Date From"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Join Date To"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetFilters}
                    startIcon={<RefreshIcon />}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </Paper>

        {/* Users Table */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.paper' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Join Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Last Login</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, idx) => (
                  <StyledTableRow key={user.id} hover>
                    <TableCell>#{idx + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: getAvatarColor(user.role),
                            mr: 2,
                            width: 40,
                            height: 40,
                            fontWeight: 600,
                            fontSize: 16
                          }}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600}>{user.name}</Typography>
                          <Typography variant="body2" color="textSecondary">ID: #{user.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{user.email}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{user.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <RoleBadge
                        role={user.role}
                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      />
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={user.status}
                        label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{format(user.joinDate, 'MMM dd, yyyy')}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{format(user.lastLogin, 'MMM dd, hh:mm a')}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" justifyContent="center" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => handleOpenDialog('view', user)}
                            color="info"
                            sx={{
                              backgroundColor: '#2196f320',
                              '&:hover': { backgroundColor: '#2196f340' }
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit User">
                          <IconButton
                            onClick={() => handleOpenDialog('edit', user)}
                            color="primary"
                            sx={{
                              backgroundColor: '#4caf5020',
                              '&:hover': { backgroundColor: '#4caf5040' }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={user.status === 'active' ? 'Deactivate' : 'Activate'}>
                          <IconButton
                            onClick={() => toggleStatus(user.id)}
                            color={user.status === 'active' ? 'warning' : 'success'}
                            sx={{
                              backgroundColor: user.status === 'active' ? '#ff980020' : '#4caf5020',
                              '&:hover': {
                                backgroundColor: user.status === 'active' ? '#ff980040' : '#4caf5040'
                              }
                            }}
                          >
                            {user.status === 'active' ? <LockIcon fontSize="small" /> : <UnlockIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                          <IconButton
                            onClick={() => handleDelete(user.id)}
                            color="error"
                            sx={{
                              backgroundColor: '#f4433620',
                              '&:hover': { backgroundColor: '#f4433640' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
          />
        </Paper>
      </>

      {/* User Dialog (View/Add/Edit) */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
          color: 'white',
          fontWeight: 600
        }}>
          {dialogType === 'view' ? 'User Details' :
            dialogType === 'add' ? 'Add New User' : 'Edit User'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ py: 3 }}>
            {dialogType === 'view' ? (
              currentUser && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        bgcolor: getAvatarColor(currentUser.role),
                        fontSize: 32,
                        fontWeight: 600
                      }}
                    >
                      {getInitials(currentUser.name)}
                    </Avatar>
                    <Typography variant="h6" fontWeight={700} mt={1}>{currentUser.name}</Typography>
                    <RoleBadge
                      role={currentUser.role}
                      label={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                      sx={{ mt: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<EmailIcon />} label="Email" value={currentUser.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<PhoneIcon />} label="Phone" value={currentUser.phone} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<CalendarIcon />} label="Join Date" value={format(currentUser.joinDate, 'MMM dd, yyyy')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<CalendarIcon />} label="Last Login" value={format(currentUser.lastLogin, 'MMM dd, hh:mm a')} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<RoleIcon />} label="Role" value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={currentUser.status === 'active' ? <UnlockIcon /> : <LockIcon />}
                      label="Status"
                      value={currentUser.status.charAt(0).toUpperCase() + currentUser.status.slice(1)}
                      color={currentUser.status === 'active' ? '#4caf50' : '#f44336'}
                    />
                  </Grid>
                </Grid>
              )
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Full Name"
                    value={dialogType === 'add' ? newUser.name : currentUser?.name || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    value={dialogType === 'add' ? newUser.email : currentUser?.email || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="Phone Number"
                    value={dialogType === 'add' ? newUser.phone : currentUser?.phone || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={dialogType === 'add' ? newUser.role : currentUser?.role || ''}
                      onChange={handleInputChange}
                      label="Role"
                    >
                      {roles.map(role => (
                        <MenuItem key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={dialogType === 'add' ? newUser.status : currentUser?.status || ''}
                      onChange={handleInputChange}
                      label="Status"
                    >
                      {statuses.map(status => (
                        <MenuItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleCloseDialog} color="inherit">
              {dialogType === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {dialogType !== 'view' && (
              <Button type="submit" variant="contained" color="primary">
                {dialogType === 'add' ? 'Create User' : 'Save Changes'}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

// Additional Components
const StatCard = ({ title, value, color, icon }) => (
  <Paper sx={{
    p: 2,
    borderRadius: 3,
    background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
    color: 'white',
    textAlign: 'center',
    boxShadow: `0 4px 20px ${color}40`,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }}>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>{title}</Typography>
    </Box>
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      {React.cloneElement(icon, { sx: { fontSize: 40, opacity: 0.8 } })}
    </Box>
  </Paper>
);

const DetailItem = ({ icon, label, value, color }) => (
  <Box display="flex" alignItems="center" p={1} bgcolor="#f9f9f9" borderRadius={2}>
    {React.cloneElement(icon, { sx: { color: color || '#757575', mr: 2 } })}
    <Box>
      <Typography variant="caption" color="textSecondary">{label}</Typography>
      <Typography fontWeight={500} color={color || 'inherit'}>{value}</Typography>
    </Box>
  </Box>
);

export default UsersPage;