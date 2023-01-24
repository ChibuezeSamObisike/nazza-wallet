import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { FieldValues, useForm } from "react-hook-form";

import nazaLogo from "assets/naza-logo.svg";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { reset } from "services/authLogin";
import { useAlert } from "hooks/useAlert";
import { handleAppError } from "utils/handleApiError";

export default function ForgotPassword() {
  const defaultValues = {
    email: "",
  };

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Type must be email"),
  });

  const resolver = yupResolver(schema);

  const { showNotification } = useAlert();

  const { mutate, isLoading } = useMutation(reset, {
    onSuccess(data) {
      showNotification?.("Sent Reset Email", { type: "success" });
      navigate("/reset-password");
      console.log("auth data", data);
    },
    onError(error) {
      showNotification?.(handleAppError(error), { type: "error" });
      console.log("onError", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver, defaultValues });

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    mutate({ data });
  };
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
        Forgot your password ?
      </Typography>

      <Typography mt={2} width={{ xs: "auto", md: 437 }} mx='auto'>
        Don't worry, just enter enter your email address send a code to your
        email address to reset your password.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder='Enter your email'
          label='Email'
          fullWidth
          {...register("email")}
          sx={{
            mt: 4,
          }}
          error={Boolean(errors["email"]?.message)}
          helperText={errors.email?.message?.toString()}
        />

        <Button
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
          sx={{
            width: "100%",
            mt: 5,

            borderRadius: 0,
            bgcolor: "#2574F5",
            ":hover": {
              bgcolor: "#2574F5",
            },
          }}
        >
          Send reset link
        </Button>
      </form>
    </Box>
  );
}
