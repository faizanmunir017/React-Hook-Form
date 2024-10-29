import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./App.css";

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  notificationEmails: string;
  age: number;
  contactNumber: string;
}

const schema = yup.object({
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

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register("lastName")} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label>Notification Emails (comma-separated)</label>
        <input {...register("notificationEmails")} />
        {errors.notificationEmails && (
          <p>{errors.notificationEmails.message}</p>
        )}
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register("age")} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label>Contact Number</label>
        <input {...register("contactNumber")} />
        {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
