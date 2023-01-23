import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

import { useForm } from "react-hook-form";

import nazaLogo from "assets/naza-logo.svg";

import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
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

      <form>
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
          onClick={() => navigate("/login")}
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
