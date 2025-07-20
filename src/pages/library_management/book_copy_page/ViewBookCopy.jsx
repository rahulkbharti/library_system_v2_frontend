import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack, Chip } from "@mui/material";

const ViewBookCopy = ({ copy, handleClose = () => {} }) => {
  if (!copy) return null;

  // Format status with color coding
  const getStatusChip = (status) => {
    const statusColors = {
      available: 'success',
      borrowed: 'warning',
      lost: 'error',
      damaged: 'error',
    };

    return (
      <Chip
        label={status}
        color={statusColors[status] || 'default'}
        variant="outlined"
        size="small"
      />
    );
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden", p: 2 }}>
      <Stack spacing={3}>
        {/* Book Information Section */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={{ gap: 2 }}
        >
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper title="Book Title" value={copy.book_title} />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper title="Book ID" value={copy.book_id} />
          </Box>
        </Stack>

        {/* Copy Information Section */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={{ gap: 2 }}
        >
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper title="Copy ID" value={copy.copy_id} />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper title="Barcode" value={copy.barcode} />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper 
              title="Status" 
              value={getStatusChip(copy.status)} 
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper title="Shelf Location" value={copy.shelf_location} />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper title="Organization ID" value={copy.organization_id} />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <InfoPaper 
              title="Date Added" 
              value={formatDate(copy.created_at)} 
            />
          </Box>
        </Stack>
      </Stack>

      <DialogActions sx={{ mt: 3, px: 0 }}>
        <Button 
          onClick={handleClose} 
          variant="contained"
          color="primary"
          sx={{ minWidth: 120 }}
        >
          Close
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ViewBookCopy;