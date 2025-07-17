// SimpleFormWithHooks.jsx
import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import FormInput from './FormInput';

const SimpleForm = () => {
  const formik = useFormik({
    initialValues: {
      enrollmentNumber: '',
      email: '',
    },
    validationSchema: Yup.object({
      enrollmentNumber: Yup.string().required('Enrollment Number is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <FormInput name="enrollmentNumber" label="Enrollment Number" />
        <FormInput name="email" label="Email" type="email" />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </FormikProvider>
  );
};

export default SimpleForm;
