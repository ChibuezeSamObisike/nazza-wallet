import { useState } from "react";

import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import nazaLogo from "assets/naza-logo.svg";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import { login } from "services/authLogin";
import * as Yup from "yup";

import { useForm, FieldValues } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { yupResolver } from "@hookform/resolvers/yup";
import { handleAppError } from "utils/handleApiError";

import { useAlert } from "hooks/useAlert";

export default function Login() {
  const { showNotification } = useAlert();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    console.log("Data payload", data);
  };

  const defaultValues = {
    passwordConfirmation: "",
    password: "",
  };

  const schema = Yup.object({
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Minimum of 6 text"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const resolver = yupResolver(schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver, defaultValues });

  return (
    <Box sx={{ width: { md: "60%", xs: "100%" } }} textAlign='center'>
      <img
        src={nazaLogo}
        alt='logo'
        width={"123px"}
        style={{
          color: "red",
          marginBottom: 4,
        }}
      />
      <Typography variant='subtitle1' fontWeight='bold'>
        Enter your new password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder='Password'
          label='Password'
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => togglePasswordVisibility()}>
                  <VisibilityOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("password")}
          error={Boolean(errors["password"]?.message)}
          helperText={errors.password?.message?.toString()}
          sx={{
            mt: 3,
          }}
        />

        <TextField
          placeholder='Confirm Password'
          label='Confirm Password'
          type={showPassword ? "" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => togglePasswordVisibility()}>
                  <VisibilityOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("passwordConfirmation")}
          error={Boolean(errors["passwordConfirmation"]?.message)}
          helperText={errors.passwordConfirmation?.message?.toString()}
          sx={{
            mt: 3,
          }}
        />

        <Button
          sx={{
            mt: 3,
            width: "100%",
          }}
          type='submit'
          startIcon={
            false && (
              <CircularProgress
                size={16}
                sx={{
                  fontSize: 2,
                  color: "#fff",
                }}
              />
            )
          }
        >
          Change Password
        </Button>
      </form>

      <Box mt={2}>
        <Typography textAlign='left'>
          Must contain at least 8 characters,{" "}
          <span
            style={{
              color: "#52C41A",
            }}
          >
            {" "}
            one uppercase, one lowercase,
          </span>{" "}
          and{" "}
          <span
            style={{
              color: "#52C41A",
            }}
          >
            one number or special character
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
