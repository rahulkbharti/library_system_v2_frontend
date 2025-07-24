import { Box, Stack } from "@mui/system";
import { FormikProvider, useFormik } from "formik";
import FormInput from "../../common/FormInput";
import { Button, Dialog, DialogActions } from "@mui/material";
import seatApi from "../../../api/services/seats.api";

const DEFAULT_VALUES = {
  seat_number: "",
  location: "",
  organization_id: 101,
};
const AddSeatForm = ({
  initialValues,
  edit = false,
  handleClose = () => {},
}) => {
  const formik = useFormik({
    initialValues: initialValues || DEFAULT_VALUES,
    onSubmit: async (values) => {
      if (edit) {
        // Call edit API
        const { seat_id, ...updateData } = values;

        const response = await seatApi.editSeat({
          seat_id: values.seat_id,
          update: updateData,
        });
        console.log("Edited seat:", response);
        handleClose();
      } else {
        const response = await seatApi.addSeat(values);
        console.log("Added seat:", response);
        handleClose();
      }
    },
  });
  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
          {/* Left Column */}
          <Stack spacing={2} flex={1}>
            <FormInput name="seat_number" label="Seat Number" required />
            <FormInput name="location" label="Location" required />
          </Stack>
          {/* Right Column */}
          <Stack spacing={2} flex={1}>
            <FormInput
              name="organization_id"
              label="Organization ID"
              required
            />
          </Stack>
        </Stack>
        <DialogActions sx={{ px: 0 }}>
          <Button type="submit" variant="contained" color="primary">
            {formik.isSubmitting
              ? edit
                ? "Updating..."
                : "Adding..."
              : edit
              ? "Update Seat"
              : "Add Seat"}
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ mr: 2 }}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

export default AddSeatForm;
