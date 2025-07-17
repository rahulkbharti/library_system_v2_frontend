import React, { useState } from "react";
import { Grid, Paper, Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import BooksIcon from "@mui/icons-material/LibraryBooks";
import MembersIcon from "@mui/icons-material/Group";
import IssuedIcon from "@mui/icons-material/AssignmentTurnedIn";
import OverdueIcon from "@mui/icons-material/ErrorOutline";


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



const initialStatus = [
    {
        name:"total-books",
        title: 'Total Books',
        value: "12,456",
        icon: <BooksIcon sx={{ color: 'primary.main' }} />,
        color: 'primary',
        description: "+12% from last month",
        descriptionColor: "textSecondary"
    },
    {
        name:"active-members",
        title: 'Active Members',
        value: "2,843",
        icon: <MembersIcon sx={{ color: 'light' }} />,
        color: 'success',
        description: "+8% from last month",
        descriptionColor: "textSecondary"
    },
    {
        name:"books-issued",
        title: 'Books Issued',
        value: "1,892",
        icon: <IssuedIcon sx={{ color: 'light' }} />,
        color: 'info',
        description: "Today: 142 books",
        descriptionColor: "textSecondary"
    },
    {
        name:"overdue-books",
        title: 'Overdue Books',
        value: "127",
        icon: <OverdueIcon sx={{ color: 'light' }} />,
        color: 'error',
        description: "+5 overdue today",
        descriptionColor: "error"
    }
];

const DashboardStatCards = () => {
    const [status,setStatus] = useState(initialStatus);
    
    return(
    <Grid container spacing={3} mb={4}>
        {status.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <StatCard>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                {stat.title}
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {stat.value}
                            </Typography>
                            <Typography
                                variant="caption"
                                color={stat.descriptionColor}
                            >
                                {stat.description}
                            </Typography>
                        </Box>
                        <Avatar
                            sx={{
                                bgcolor: `${stat.color}.light`,
                                width: 56,
                                height: 56,
                            }}
                        >
                            {stat.icon}
                        </Avatar>
                    </Box>
                </StatCard>
            </Grid>
        ))}
    </Grid>
    );
};

export default DashboardStatCards;