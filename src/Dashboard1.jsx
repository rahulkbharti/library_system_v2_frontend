import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';


const DashboardWrapper = styled(Box)`
  background: linear-gradient(to right, #ee0979, #ff6a00);
  min-height: 100vh;
  padding: 0;
  color: #333;
  display: flex;
`;

const ContentWrapper = styled(Box)`
  background: white;
  padding: 10px 24px;
  width: 100%;
`;

const SidebarContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  z-index: 1000;
`;

const SidebarIconButton = styled(IconButton)`
  margin: 16px 0;
  color: #555;
  &:hover {
    background-color: #ffe5ec;
    color: #ff4b5c;
  }
`;

const StatCard = styled(Card)`
  background: #fff3f3;
  border-radius: 16px;
  text-align: center;
  box-shadow: none;
`;

const bookCovers = [
  "https://covers.openlibrary.org/b/id/8228691-L.jpg",
  "https://covers.openlibrary.org/b/id/10521232-L.jpg",
  "https://covers.openlibrary.org/b/id/10472217-L.jpg",
  "https://covers.openlibrary.org/b/id/10525534-L.jpg",
  "https://covers.openlibrary.org/b/id/11105129-L.jpg",
  "https://covers.openlibrary.org/b/id/11108008-L.jpg",
];

const TopBar = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" fontWeight="bold">
        Dashboard
      </Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <Avatar src="https://i.pravatar.cc/150?img=1" />
    </Box>
  </Box>
);

const StatCards = () => (
  <Grid container spacing={3} mt={2}>
    {[
      { label: "Total Visitors", value: 1223 },
      { label: "Borrowed Books", value: 740 },
      { label: "Overdue Books", value: 22 },
      { label: "New Members", value: 60 },
    ].map((stat, index) => (
      <Grid item xs={6} md={3} key={index}>
        <StatCard>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </CardContent>
        </StatCard>
      </Grid>
    ))}
  </Grid>
);

const UsersTable = () => (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Typography variant="h6" p={2}>
      Users List
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Book Issued</TableCell>
          <TableCell>Department</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          ["10201", "Alex Ray", 12, "Psychology"],
          ["10234", "Sophia", 7, "Business"],
          ["22987", "John", 5, "Computer Science"],
          ["53722", "Rose", 25, "Pharmacy"],
        ].map(([id, name, book, dept]) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{book}</TableCell>
            <TableCell>{dept}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const BookCovers = () => (
  <Box mt={5}>
    <Typography variant="h6" mb={2}>
      Top Choices
    </Typography>
    <Box display="flex" overflow="auto" gap={2}>
      {bookCovers.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`book-${idx}`}
          width={120}
          height={160}
          style={{ borderRadius: 12 }}
        />
      ))}
    </Box>
  </Box>
);

const OverdueList = () => (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Typography variant="h6" p={2}>
      Overdue Book List
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Book</TableCell>
          <TableCell>Overdue</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Fine</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          [
            "10201",
            "Alex Ray",
            "Ancestor Trouble",
            "3 days",
            "Returned (Late)",
            "BDT. 150",
          ],
          [
            "10234",
            "Sophia",
            "Life is Everywhere",
            "1 day",
            "Delay",
            "BDT. 50",
          ],
          [
            "22987",
            "John",
            "Stroller",
            "5 days",
            "Returned (Late)",
            "BDT. 100",
          ],
          ["53722", "Rose", "The Secret Syllabus", "-", "Returned", "BDT. 0"],
        ].map(([id, name, book, overdue, status, fine]) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{book}</TableCell>
            <TableCell>{overdue}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{fine}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const StatisticsChart = () => {
  const data = [
    { day: "SAT", Visitors: 30, Borrowers: 20 },
    { day: "SUN", Visitors: 50, Borrowers: 25 },
    { day: "MON", Visitors: 60, Borrowers: 45 },
    { day: "TUE", Visitors: 70, Borrowers: 35 },
    { day: "WED", Visitors: 40, Borrowers: 20 },
    { day: "THU", Visitors: 90, Borrowers: 55 },
    { day: "FRI", Visitors: 85, Borrowers: 60 },
  ];

  return (
    <Box mt={5}>
      <Typography variant="h6" mb={2}>
        Visitors & Borrowers Statistics
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Visitors" fill="#8884d8" />
          <Bar dataKey="Borrowers" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

const LeftSidebar = () => (
  <SidebarContainer>
    <SidebarIconButton>
      <DashboardIcon />
    </SidebarIconButton>
    <SidebarIconButton>
      <BookIcon />
    </SidebarIconButton>
    <SidebarIconButton>
      <GroupIcon />
    </SidebarIconButton>
  </SidebarContainer>
);


const data = [
  { icon: <People />, label: 'Dashboard', active:true},
  { icon: <Dns />, label: 'Books' },
  { icon: <PermMedia />, label: 'Users' },
  { icon: <Public />, label: 'Transactions' },
];


const Dashboard1 = () => {
  return (
    <DashboardWrapper>
      {/* <LeftSidebar /> */}
      <ContentWrapper>
        <TopBar />
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={2}>
          <Box>
            {data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{ py: 1, minHeight: 32, color: item?.active ? '#ff4b5c' : 'inherit', '&:hover': { backgroundColor: '#ffe5ec' } }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
              </ListItemButton>
            ))}
          </Box>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              flexGrow: 1,
              padding: 3,
              borderRadius: 2,
              height: "100vh",
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          >
            <Box mt={0}>
              <Typography variant="h4">
                Hello, <span style={{ color: "#ff4b5c" }}>{"User"}!</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jan 12, 2023 | Thursday, 11:00 AM
              </Typography>
            </Box>
            <StatCards />
             <OverdueList />
            <BookCovers />
            <UsersTable />
            <StatisticsChart />
          </Box>
        </Stack>
      </ContentWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard1;
