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
import organizationApi from "../../../api/services/organization.api";
import { use } from "react";
import { useSelector } from "react-redux";

const DEFAULT_VALUES = {
  name: "",
  address: "",
};

const AddOrganizationForm = ({
  initialValues,
  edit = false,
  handleClose = () => {},
}) => {
  const admin_id = useSelector(
    (state) => state?.auth?.login_data?.userData?.admin_id
  );
  // console.log("Admin ID:", admin_id);
  const formik = useFormik({
    initialValues: initialValues || DEFAULT_VALUES,
    onSubmit: async (values) => {
      try {
        if (edit) {
          // console.log("Editing organization:", values);
          const body = {
            organization_id: values.organization_id,
            update: {
              name: values.name,
              address: values.address,
              created_by_admin: admin_id,
            },
          };
          await organizationApi.editOrganization(body);
        } else {
          await organizationApi.addOrganization({
            ...values,
            created_by_admin: admin_id,
          });
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting organization:", error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <FormInput name="name" label="Organization Name" required fullWidth />
          <FormInput name="address" label="Address" required fullWidth />
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
              ? "Update Organization"
              : "Add Organization"}
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

AddOrganizationForm.propTypes = {
  initialValues: PropTypes.object,
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddOrganizationForm;
