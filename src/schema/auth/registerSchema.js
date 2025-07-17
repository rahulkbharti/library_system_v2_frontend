import * as Yup from 'yup';

const registerSchema = Yup.object({
  first_name: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
    // enrollment_number: Yup.string()
    //   .min(5, "Enrolment number must be at least 5 characters")
    //   .required("Enrolment number is required"),
    organization_is: Yup.string()
      .required("Organization ID is required"),
});

export default registerSchema;
