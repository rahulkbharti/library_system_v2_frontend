import {
  Box,
  Button,
  DialogActions,
  Stack,
  CircularProgress,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import FormInput from "../../common/FormInput";
import staffApi from "../../../api/services/staff.api";
import { use } from "react";

const DEFAULT_VALUES = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  organization_id: "",
};

const AddStaffForm = ({
  initialValues,
  edit = false,
  handleClose = () => {},
}) => {
  const formik = useFormik({
    initialValues: initialValues || DEFAULT_VALUES,
    onSubmit: async (values) => {
      try {
        if (edit) {
          const body = {
            user_id: values.user_id,
            staff: false,
            update: {
              username: values.username,
              email: values.email,
              first_name: values.first_name,
              last_name: values.last_name,
              phone: values.phone,
            },
          };
          console.log("Editing staff:", body);
          await staffApi.editStaff(body);
        } else {
          await staffApi.addStaff(values);
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting staff:", error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
          {/* Left Column */}
          <Stack spacing={2} flex={1}>
            <FormInput name="username" label="Username" required />
            {!edit && (
              <FormInput
                name="password"
                label="Password"
                type="password"
                required
              />
            )}
            <FormInput name="email" label="Email" type="email" required />
          </Stack>

          {/* Right Column */}
          <Stack spacing={2} flex={1}>
            <FormInput name="first_name" label="First Name" required />
            <FormInput name="last_name" label="Last Name" required />
            <FormInput name="phone" label="Phone Number" required />
            <FormInput
              name="organization_id"
              label="Organization ID"
              type="number"
              required
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
              ? "Update Staff"
              : "Add Staff"}
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

AddStaffForm.propTypes = {
  initialValues: PropTypes.object,
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddStaffForm;
