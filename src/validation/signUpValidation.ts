import * as yup from "yup";

export const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  notificationEmails: yup
    .string()
    .required("Notification emails are required")
    .test(
      "is-valid-email-list",
      "Enter valid email addresses separated by commas",
      (value) =>
        value
          ? value
              .split(",")
              .every((email) => yup.string().email().isValidSync(email.trim()))
          : false
    ),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "Age must be between 18 and 151")
    .max(151, "Age must be between 18 and 151"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^\d{11}$/, "Contact number must be an 11 digit number"),
});
