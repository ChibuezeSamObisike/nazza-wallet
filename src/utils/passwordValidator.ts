interface Validator {
  message: string;
  passed: boolean;
}

export const passwordValidator = (password: string): Array<Validator> => {
  const validator: Array<Validator> = [
    { message: "At least 8 characters", passed: password.length >= 8 },
    {
      message: "At least one uppercase letter",
      passed: /[A-Z]/.test(password),
    },
    { message: "At least one numbers", passed: /[0-9]/.test(password) },
    {
      message: "At least one special character",
      passed: /[\W_]/.test(password),
    },
  ];

  return validator;
};
