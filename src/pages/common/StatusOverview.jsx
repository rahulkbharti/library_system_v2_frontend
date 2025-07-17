import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@library.com",
    role: "admin",
    status: "active",
    phone: "+1 (555) 123-4567",
    joinDate: new Date(2022, 0, 15),
    lastLogin: new Date(2023, 5, 22, 14, 30),
  },
];

const StatusOverview = ({ status }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {status.map((item) => (
        <Grid item xs={12} md={3}>
          <StatCard
            title={item?.title || "Title"}
            value={item?.value}
            color={item?.color}
            icon={item?.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
};
const StatCard = ({ title, value, color, icon }) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: 3,
      background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
      color: "white",
      textAlign: "center",
      boxShadow: `0 4px 20px ${color}40`,
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {title}
      </Typography>
    </Box>
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      {React.cloneElement(icon, { sx: { fontSize: 40, opacity: 0.8 } })}
    </Box>
  </Paper>
);
export default StatusOverview;
