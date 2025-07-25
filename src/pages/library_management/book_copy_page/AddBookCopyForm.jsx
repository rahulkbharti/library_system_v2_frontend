import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  DialogActions,
  Stack,
  CircularProgress,
  Autocomplete,
  TextField,
  MenuItem,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import FormInput from "../../common/FormInput";
import bookApi from "../../../api/services/book.api";
import bookCopyApi from "../../../api/services/book_copy.api";

const DEFAULT_VALUES = {
  book_id: null,
  barcode: "",
  status: "available",
  shelf_location: "",
};

const STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "checked_out", label: "Checked Out" },
  { value: "lost", label: "Lost" },
  { value: "damaged", label: "Damaged" },
];

const AddBookCopyForm = ({
  initialValues,
  edit = false,
  handleClose = () => {},
}) => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        const response = await bookApi.getBooks({ title: searchQuery });
        setBooks(response?.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoadingBooks(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const formik = useFormik({
    initialValues: initialValues || DEFAULT_VALUES,
    onSubmit: async (values) => {
      try {
        if (edit) {
          const { copy_id, book_title, created_at, ...body } = values;
          await bookCopyApi.editBookCopy(copy_id, body);
        } else {
          await bookCopyApi.addBookCopy(values);
        }
        handleClose();
      } catch (error) {
        console.error("Error submitting book copy:", error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          {/* Book Selection */}
          <Autocomplete
            size="small"
            options={books}
            loading={loadingBooks}
            getOptionLabel={(option) => option.title || ""}
            isOptionEqualToValue={(option, value) =>
              option.book_id === value.book_id
            }
            value={
              books.find((book) => book.book_id === formik.values.book_id) ||
              null
            }
            onChange={(_, value) => {
              formik.setFieldValue("book_id", value?.book_id || null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Book"
                variant="outlined"
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingBooks ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Book Copy Details */}
          <Stack direction="row" spacing={2}>
            <FormInput name="barcode" label="Barcode" required fullWidth />
            <FormInput
              name="shelf_location"
              label="Shelf Location"
              required
              fullWidth
            />
          </Stack>

          <FormInput
            select
            name="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormInput>
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
              ? "Update Copy"
              : "Add Copy"}
          </Button>
        </DialogActions>
      </Box>
    </FormikProvider>
  );
};

AddBookCopyForm.propTypes = {
  initialValues: PropTypes.object,
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddBookCopyForm;
