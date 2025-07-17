import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, Grid, Typography, Paper, Avatar, IconButton, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, LinearProgress, Button, 
  TextField, InputAdornment, Badge, Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  MenuBook as BooksIcon,
  People as MembersIcon,
  EventAvailable as IssuedIcon,
  EventBusy as OverdueIcon,
  BarChart as StatsIcon,
  AccessTime as RecentIcon,
  CalendarToday as DueIcon,
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, 
         ResponsiveContainer, XAxis, YAxis, CartesianGrid, 
         Tooltip as ChartTooltip, Legend, Cell } from 'recharts';

import DashboardStatCards from './status/StatusCards';

// Styled components
const DashboardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  padding: theme.spacing(3),
  overflow:"hidden"
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 8,
  padding: '8px 16px',
  fontWeight: 500,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

// Mock data - in a real app, this would come from an API
const dashboardStats = {
  totalBooks: "12,456",
  activeMembers: "2,843",
  booksIssued: "1,892",
  overdueBooks: "127",
};

const recentActivities = [
  { id: 1, member: 'Sarah Johnson', book: 'The Silent Patient', action: 'Issued', time: '10 mins ago' },
  { id: 2, member: 'Michael Chen', book: 'Atomic Habits', action: 'Returned', time: '25 mins ago' },
  { id: 3, member: 'Emma Rodriguez', book: 'Educated: A Memoir', action: 'Renewed', time: '1 hour ago' },
  { id: 4, member: 'David Wilson', book: 'Sapiens: A Brief History', action: 'Reserved', time: '2 hours ago' },
  { id: 5, member: 'Priya Patel', book: 'The Midnight Library', action: 'Issued', time: '3 hours ago' },
];

const dueBooks = [
  { id: 1, title: 'The Great Gatsby', member: 'James Smith', dueDate: 'Tomorrow', status: 'warning' },
  { id: 2, title: 'To Kill a Mockingbird', member: 'Olivia Brown', dueDate: 'In 2 days', status: 'warning' },
  { id: 3, title: '1984', member: 'Robert Taylor', dueDate: 'Today', status: 'danger' },
  { id: 4, title: 'Pride and Prejudice', member: 'Sophia Garcia', dueDate: 'In 3 days', status: 'normal' },
  { id: 5, title: 'The Hobbit', member: 'William Davis', dueDate: 'Yesterday', status: 'danger' },
];

const genreData = [
  { name: 'Fiction', value: 35 },
  { name: 'Non-Fiction', value: 25 },
  { name: 'Science', value: 15 },
  { name: 'History', value: 12 },
  { name: 'Biography', value: 8 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const monthlyIssuance = [
  { month: 'Jan', books: 240 },
  { month: 'Feb', books: 380 },
  { month: 'Mar', books: 200 },
  { month: 'Apr', books: 278 },
  { month: 'May', books: 189 },
  { month: 'Jun', books: 239 },
  { month: 'Jul', books: 349 },
  { month: 'Aug', books: 420 },
  { month: 'Sep', books: 380 },
  { month: 'Oct', books: 200 },
  { month: 'Nov', books: 278 },
  { month: 'Dec', books: 189 },
];

const popularBooks = [
  { title: 'Atomic Habits', author: 'James Clear', issues: 142 },
  { title: 'The Midnight Library', author: 'Matt Haig', issues: 128 },
  { title: 'Educated: A Memoir', author: 'Tara Westover', issues: 115 },
  { title: 'Where the Crawdads Sing', author: 'Delia Owens', issues: 103 },
  { title: 'The Silent Patient', author: 'Alex Michaelides', issues: 97 },
];


const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Morgan',
    role: 'Librarian',
    email: 'alex.morgan@example.com',
    lastLogin: '2 hours ago',
  });

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'danger': return 'error';
      case 'warning': return 'warning';
      default: return 'success';
    }
  };

  return (
    <>
       {/* Stats Cards */}
      <DashboardStatCards dashboardStats={dashboardStats}/>
     
      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <SectionTitle variant="h6">
                <StatsIcon /> Monthly Book Issuance
              </SectionTitle>
              <ActionButton variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh}>
                Refresh Data
              </ActionButton>
            </Box>
            {loading ? (
              <Box height={300} display="flex" alignItems="center" justifyContent="center">
                <LinearProgress sx={{ width: '100%' }} />
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyIssuance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="books" fill="#8884d8" name="Books Issued" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <SectionTitle variant="h6">
              <StatsIcon /> Book Distribution by Genre
            </SectionTitle>
            {loading ? (
              <Box height={300} display="flex" alignItems="center" justifyContent="center">
                <LinearProgress sx={{ width: '100%' }} />
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Tables Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <SectionTitle variant="h6">
                <RecentIcon /> Recent Activities
              </SectionTitle>
              <ActionButton variant="text">View All</ActionButton>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Member</TableCell>
                    <TableCell>Book</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell align="right">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <StyledTableRow key={activity.id}>
                      <TableCell>{activity.member}</TableCell>
                      <TableCell>{activity.book}</TableCell>
                      <TableCell>
                        <Box 
                          component="span" 
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: activity.action === 'Issued' ? 'primary.light' : 
                                      activity.action === 'Returned' ? 'success.light' : 
                                      activity.action === 'Renewed' ? 'info.light' : 'warning.light',
                            color: activity.action === 'Issued' ? 'primary.dark' : 
                                   activity.action === 'Returned' ? 'success.dark' : 
                                   activity.action === 'Renewed' ? 'info.dark' : 'warning.dark',
                          }}
                        >
                          {activity.action}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{activity.time}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <SectionTitle variant="h6">
                <DueIcon /> Upcoming Due Books
              </SectionTitle>
              <ActionButton variant="outlined" startIcon={<AddIcon />}>
                Send Reminders
              </ActionButton>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Book Title</TableCell>
                    <TableCell>Member</TableCell>
                    <TableCell align="right">Due Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dueBooks.map((book) => (
                    <StyledTableRow key={book.id}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.member}</TableCell>
                      <TableCell align="right">
                        <Box 
                          component="span" 
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: book.status === 'danger' ? 'error.light' : 
                                      book.status === 'warning' ? 'warning.light' : 'success.light',
                            color: book.status === 'danger' ? 'error.dark' : 
                                   book.status === 'warning' ? 'warning.dark' : 'success.dark',
                          }}
                        >
                          {book.dueDate}
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Popular Books Section */}
      <Grid container spacing={3} mt={0}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
            <SectionTitle variant="h6">
              <StatsIcon /> Most Popular Books
            </SectionTitle>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Book Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell align="right">Times Issued</TableCell>
                    <TableCell align="center">Popularity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {popularBooks.map((book, index) => (
                    <StyledTableRow key={index}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell align="right">{book.issues}</TableCell>
                      <TableCell>
                        <LinearProgress 
                          variant="determinate" 
                          value={(book.issues / popularBooks[0].issues) * 100} 
                          color={index === 0 ? "primary" : "secondary"}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;