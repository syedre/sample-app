export const F_EMAIL = "email";
export const F_PASSWORD = "password";
export const F_NAME = "name";
export const F_TEXT = "text";

export const Login_Form = [
  {
    type: F_TEXT,
    label: F_EMAIL,
    rules: {
      required: {
        value: true,
        message: "Email address is required",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    type: F_PASSWORD,
    label: F_PASSWORD,
    rules: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 8,
        message: "Minimum 8 characters is required",
      },
    },
  },
];

export const Sign_Up_Form = [
  { type: F_TEXT, label: F_NAME },
  { type: F_TEXT, label: F_EMAIL },
  { type: F_PASSWORD, label: F_PASSWORD },
];
