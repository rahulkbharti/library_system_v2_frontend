import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack } from "@mui/material";

const ViewStudent = ({ student, handleClose = () => {} }) => {
  if (!student) return null;

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ gap: 2 }}
      >
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Username" value={student.username} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Email" value={student.email} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="First Name" value={student.first_name} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Last Name" value={student.last_name} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Phone" value={student.phone} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Organization ID" value={student.organization_id} />
        </Box>
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Box>
  );
};

export default ViewStudent;
