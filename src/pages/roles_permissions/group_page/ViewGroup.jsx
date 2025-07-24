import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack } from "@mui/material";

const ViewGroup = ({ group, handleClose = () => {} }) => {
  if (!group) return null;

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Stack spacing={2}>
        <InfoPaper title="Group ID" value={group.group_id} />
        <InfoPaper title="Organization ID" value={group.organization_id} />
        <InfoPaper title="Group Name" value={group.name} />
        <InfoPaper
          title="Created At"
          value={new Date(group.created_at).toLocaleString()}
        />
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Box>
  );
};

export default ViewGroup;
