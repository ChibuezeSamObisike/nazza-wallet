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

import { setToken } from "utils/auth";

import { useAlert } from "hooks/useAlert";

import { getDecodedJwt } from "utils/auth";

export default function Login() {
  const { showNotification } = useAlert();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { mutate, isLoading } = useMutation(login, {
    onSuccess(data) {
      showNotification?.("Login Successful", { type: "success" });
      navigate("/");
      console.log("auth data", data);
      setToken(data?.accessToken?.token);
      getDecodedJwt();
    },
    onError(error) {
      showNotification?.(handleAppError(error), { type: "error" });
      console.log("onError", error);
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    console.log("Data payload", data);
    return mutate({ data });
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Type most be email"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Minimum of 6 text"),
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
        Login to your account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder='Password'
          label='Password'
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
          {...register("password")}
          error={Boolean(errors["password"]?.message)}
          helperText={errors.password?.message?.toString()}
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
            isLoading && (
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
          Enter new password
        </Button>
      </form>
    </Box>
  );
}
