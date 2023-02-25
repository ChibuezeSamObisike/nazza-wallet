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

import { getDecodedJwt, setName } from "utils/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Login() {
  const { showNotification } = useAlert();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { mutate, isLoading } = useMutation(login, {
    onSuccess(data) {
      console.log("Data info", data);
      setName(JSON.stringify(data?.user));
      if (!data?.user?.twofa) {
        showNotification?.("Login Successful", { type: "success" });
        navigate("/");
        setToken(data?.accessToken?.token);
        getDecodedJwt();
      } else if (data?.user?.twofa) {
        navigate("/verify-email-otp", { state: { email: data?.user?.email } });
      }

      console.log("Access Token>", data?.user?.twofa);
    },
    onError(error) {
      showNotification?.(handleAppError(error), { type: "error" });
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    return mutate({ data });
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Type must be email"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Minimum of 8 text"),
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
          placeholder='Email'
          label='Email'
          fullWidth
          {...register("email")}
          sx={{
            mt: 3,
          }}
          error={Boolean(errors["email"]?.message)}
          helperText={errors.email?.message?.toString()}
        />

        <TextField
          placeholder='Password'
          label='Password'
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => togglePasswordVisibility()}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
          Login
        </Button>
      </form>

      <Box
        display='flex'
        mt={2}
        alignItems='center'
        mb={4}
        justifyContent='flex-end'
      >
        <Typography
          color='#145CD3'
          fontWeight={400}
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot your password?
        </Typography>
      </Box>

      <Typography display='flex' mt={2} alignItems='center' fontWeight={300}>
        Don't Have an account?{" "}
        <Typography
          ml={1}
          color='#2574F5'
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/account-setup")}
        >
          Create Account
        </Typography>
      </Typography>
    </Box>
  );
}
