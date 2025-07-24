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
import groupApi from "../../../api/services/group.api";

const DEFAULT_VALUES = {
  organization_id: "",
  name: "",
};

const AddGroupForm = ({
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
            id: values.id,
            update: {
              name: values.name,
            },
          };
          await groupApi.editGroup(body);
        } else {
          await groupApi.addGroup(values);
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting group:", error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <FormInput
            name="organization_id"
            label="Organization ID"
            type="number"
            required
            fullWidth
          />
          <FormInput name="name" label="Group Name" required fullWidth />
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
              ? "Update Group"
              : "Add Group"}
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

AddGroupForm.propTypes = {
  initialValues: PropTypes.object,
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddGroupForm;
