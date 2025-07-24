import InfoPaper from "../../common/InfoPaper";
import { Box, Button, DialogActions, Stack } from "@mui/material";

const ViewReservation = ({ reservation, handleClose = () => {} }) => {
  if (!reservation) return null;

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ gap: 2 }}
      >
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Seat ID" value={reservation.seat_id} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="User ID" value={reservation.user_id} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="Start Time" value={reservation.start_time} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper title="End Time" value={reservation.end_time} />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <InfoPaper
            title="Reservation Date"
            value={reservation.reservation_date}
          />
        </Box>
      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Box>
  );
};

export default ViewReservation;
