import { Box, Button, DialogActions, Stack, CircularProgress } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import FormInput from "../../common/FormInput";
import bookApi from "../../../api/services/book.api";

const DEFAULT_VALUES = {
  title: "",
  author: "",
  isbn: "",
  publisher: "",
  published_year: "",
};

const AddBookForm = ({ initialValues, edit = false, handleClose = () => {} }) => {
  const formik = useFormik({
    initialValues: initialValues || DEFAULT_VALUES,
    onSubmit: async (values) => {
      try {
        if (edit) {
          const { book_id, created_at, ...body } = values;
          await bookApi.EditBook(book_id, body);
        } else {
          await bookApi.AddBook(values);
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting book:", error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
          {/* Left Column */}
          <Stack spacing={2} flex={1}>
            <FormInput name="title" label="Title" required />
            <FormInput name="isbn" label="ISBN" required />
            <FormInput 
              name="published_year" 
              label="Published Year" 
              type="number"
            />
          </Stack>

          {/* Right Column */}
          <Stack spacing={2} flex={1}>
            <FormInput name="author" label="Author" required />
            <FormInput name="publisher" label="Publisher" required />
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
              ? edit ? "Updating..." : "Adding..." 
              : edit ? "Update Book" : "Add Book"}
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

AddBookForm.propTypes = {
  initialValues: PropTypes.object,
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddBookForm;