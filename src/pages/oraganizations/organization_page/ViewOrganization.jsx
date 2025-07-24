import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack } from "@mui/material";

const ViewOrganization = ({ organization, handleClose = () => {} }) => {
  if (!organization) return null;

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Stack spacing={2}>
        <InfoPaper title="Organization Name" value={organization.name} />
        <InfoPaper title="Address" value={organization.address} />
        <InfoPaper
          title="Created By Admin ID"
          value={organization.created_by_admin}
        />
        <InfoPaper
          title="Created At"
          value={new Date(organization.created_at).toLocaleString()}
        />
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Box>
  );
};

export default ViewOrganization;
