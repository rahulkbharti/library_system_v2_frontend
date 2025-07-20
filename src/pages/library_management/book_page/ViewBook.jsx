import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack } from "@mui/material";

const ViewBook = ({ book,handleClose = ()=>{}}) => {
  if (!book) return null;

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ gap: 2 }}
      >
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Title" value={book.title} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Author" value={book.author} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="ISBN" value={book.isbn} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Publisher" value={book.publisher} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Published Year" value={book.published_year} />
        </Box>
      </Stack>
      <DialogActions>
        {/* Action Buttons */}
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Box>
  );
};

export default ViewBook;
