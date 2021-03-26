import * as yup from "yup";

const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is a required field"),

  password: yup
    .string()
    .min(6, ({ min }) => `Password must be atleast ${min} characters long`)
    .required("Password is a required field"),

  confirmPassword: yup
    .string()
    .required("Confirm password is a required field"),
});

export default signupValidationSchema;
