import TextField from '@mui/material/TextField';
import { FastField } from 'formik';

const FormInput = ({ name, label, type = 'text', ...props }) => {
  return (
    <FastField name={name}>
      {({ field, meta }) => (
        <TextField
          size="small"
          fullWidth
          margin="normal"
          label={label}
          type={type}
          {...field}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ""}
          {...props}
        />
      )}
    </FastField>
  );
};

export default FormInput;
