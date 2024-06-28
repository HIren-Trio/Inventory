import * as Yup from "yup";
const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const SignupVerifyOOPSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      strongPasswordRegex,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Please enter Password!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Confirm Password is required!"),
  otp: Yup.string()
    .required("OTP is required!")
    .length(6, "OTP must be 6 digit!"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Please enter email!").email("Must be email"),
  password: Yup.string().required("Please enter Password!"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  phone_number: Yup.number().required("Please Enter Mobile Number!"),
});

export const ForgotUsernameFormSchema = Yup.object().shape({
  phone_number: Yup.number().required("Please Enter Mobile Number!"),
});

export const ForgotUsernameOTPSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required!")
    .length(6, "OTP must be 6 digit!"),
});

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Please enter Name!"),
  // phone_number: Yup.number().required("Please enter Mobile Number!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      strongPasswordRegex,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Please enter Password!"),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      strongPasswordRegex,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Please enter Password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please enter Confirm Password!"),
  otp: Yup.string()
    .required("OTP is required!")
    .length(6, "OTP must be 6 digit!"),
});