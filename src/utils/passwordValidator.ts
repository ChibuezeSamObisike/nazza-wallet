interface Errors {
  "At least 8 characters": boolean;
  "At least one uppercase letter": boolean;
  "At least one numbers": boolean;
  "At least one special character": boolean;
}

export const passwordValidator = (password: string): string[] => {
  const errors: Errors = {
    "At least 8 characters": password.length >= 8,
    "At least one uppercase letter": /[A-Z]/.test(password),
    "At least one numbers": /[0-9]/.test(password),
    "At least one special character": /[\W_]/.test(password),
  };

  const res = Object.keys(errors).filter(
    (x) => errors[x as keyof Errors] === false
  );

  return res;
};
