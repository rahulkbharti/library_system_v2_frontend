import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack } from "@mui/material";

const ViewStaff = ({ staff, handleClose = () => {} }) => {
  if (!staff) return null;

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ gap: 2 }}
      >
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Username" value={staff.username} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Email" value={staff.email} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="First Name" value={staff.first_name} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Last Name" value={staff.last_name} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Phone" value={staff.phone} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Organization ID" value={staff.organization_id} />
        </Box>
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Box>
  );
};

export default ViewStaff;
