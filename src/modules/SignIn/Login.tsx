import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import nazaLogo from "assets/naza-logo.svg";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import { login } from "services/authLogin";
import * as Yup from "yup";

import { useForm, FieldValues } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { handleAppError } from "utils/handleApiError";

import { setToken } from "utils/auth";

import { useAlert } from "hooks/useAlert";

import { getDecodedJwt } from "utils/auth";

export default function Login() {
  const { showNotification } = useAlert();
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
    <Box sx={{ width: { md: "60%", xs: "100%" } }}>
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
        <Typography color='#145CD3' fontWeight={400}>
          Forgot your password?
        </Typography>
      </Box>

      <Typography display='flex' mt={2} alignItems='center'>
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
