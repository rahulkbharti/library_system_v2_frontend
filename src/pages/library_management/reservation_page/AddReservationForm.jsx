import {
  Box,
  Button,
  DialogActions,
  Stack,
  CircularProgress,
  TextField,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import FormInput from "../../common/FormInput";
import reservationApi from "../../../api/services/seat_reservations.api";
const DEFAULT_VALUES = {
  seat_id: "",
  user_id: "",
  start_time: new Date().toISOString().slice(0, 16),
  end_time: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16), // 1 month later
  reservation_date: new Date().toISOString().slice(0, 10),
};

// Convert datetime-local input value to "YYYY-MM-DD HH:MM:SS" format
const formatToApiDateTime = (datetimeLocalString) => {
  if (!datetimeLocalString) return "";
  return datetimeLocalString.replace("T", " ") + ":00";
};

// Convert date input value to "YYYY-MM-DD" format
const formatToApiDate = (dateString) => {
  if (!dateString) return "";
  return dateString;
};

const AddReservationForm = ({
  initialValues,
  edit = false,
  handleClose = () => {},
}) => {
  const formik = useFormik({
    initialValues: initialValues
      ? {
          ...initialValues,
          start_time: new Date(DEFAULT_VALUES.start_time)
            .toISOString()
            .slice(0, 16),
          end_time: new Date(initialValues.end_time).toISOString().slice(0, 16),
          reservation_date: new Date(initialValues.reservation_date)
            .toISOString()
            .slice(0, 10),
        }
      : DEFAULT_VALUES,

    onSubmit: async (values) => {
      try {
        const formattedValues = {
          ...values,
          start_time: formatToApiDateTime(values.start_time),
          end_time: formatToApiDateTime(values.end_time),
          reservation_date: formatToApiDate(values.reservation_date),
        };

        if (edit) {
          const {
            reservation_id,
            user_id,
            seat_id,
            start_time,
            end_time,
            reservation_date,
          } = formattedValues;
          //   await reservationApi.editReservation(reservation_id, body);
          const body = {
            reservation_id: reservation_id,
            update: {
              user_id: user_id,
              seat_id: seat_id,
              start_time: start_time,
              end_time: end_time,
              reservation_date: reservation_date,
            },
          };
          console.log("Editing reservation:", body);
          await reservationApi.editReservation(body);
        } else {
          console.log("Adding reservation:", { ...formattedValues });
          await reservationApi.addReservation(formattedValues);
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting reservation:", error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
          {/* Left Column */}
          <Stack spacing={2} flex={1}>
            <FormInput name="seat_id" label="Seat ID" type="number" required />
            <FormInput name="user_id" label="User ID" type="number" required />
          </Stack>

          {/* Right Column */}
          <Stack spacing={2} flex={1}>
            <TextField
              label="Start Time"
              type="datetime-local"
              name="start_time"
              value={formik.values.start_time}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{
                step: 300, // 5 minutes
              }}
            />
            <TextField
              label="End Time"
              type="datetime-local"
              name="end_time"
              value={formik.values.end_time}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{
                step: 300, // 5 minutes
              }}
            />
            <TextField
              label="Reservation Date"
              type="date"
              name="reservation_date"
              value={formik.values.reservation_date}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </Stack>

        <DialogActions sx={{ px: 0 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ mr: 2 }}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            startIcon={
              formik.isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {formik.isSubmitting
              ? edit
                ? "Updating..."
                : "Adding..."
              : edit
              ? "Update Reservation"
              : "Add Reservation"}
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

AddReservationForm.propTypes = {
  initialValues: PropTypes.object,
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddReservationForm;
