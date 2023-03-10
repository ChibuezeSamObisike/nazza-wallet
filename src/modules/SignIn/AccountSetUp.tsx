import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import nazaLogo from "assets/naza-logo.svg";
import { pxToRem } from "utils/pxToRem";

import { AxiosError } from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";

import { useMutation } from "react-query";

import { register as registerService } from "services/authLogin";

import { handleAppError } from "utils/handleApiError";

import { useAlert } from "hooks/useAlert";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import * as Yup from "yup";

export default function AccountSetUp() {
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  const refferal_code = new URLSearchParams(location.search).get("ref");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const defaultValues = {
    email: "",
    password: "",
    name: "",
    lastname: "",
  };
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const { mutate, isLoading } = useMutation(registerService, {
    onSuccess(data) {
      showNotification?.("Success", { type: "success" });

      navigate("/verify", { state: { email: emailVal ?? "Hello world" } });
    },
    onError(error: AxiosError) {
      showNotification?.(handleAppError(error), {
        type: "error",
      });
    },
  });

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Type must be email"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Minimum of 8 text")
      .matches(/[0-9]/, "Must have a number"),
    name: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
  });

  const resolver = yupResolver(schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver, defaultValues });

  const emailVal = getValues("email");

  const onSubmit = (data: FieldValues) => {
    mutate({ ...data, referral: refferal_code });
  };
  return (
    <Box
      sx={{ width: { md: "60%", xs: "100%" }, mt: { md: -12, xs: 5 } }}
      textAlign='center'
    >
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
        Let???s get to know you
      </Typography>
      <Typography
        variant='subtitle2'
        color='#47454C'
        fontWeight={400}
        fontSize={pxToRem(18)}
      >
        Please make sure the details are correct as they will be use used to
        verify your identity.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection={{ xs: "column", md: "row" }}>
          <TextField
            placeholder='Name'
            label='Name'
            fullWidth
            {...register("name")}
            sx={{
              mt: 3,
              mr: { xs: 0, md: 2 },
            }}
            error={Boolean(errors["name"]?.message)}
            helperText={errors.name?.message?.toString()}
          />
          <TextField
            placeholder='Last Name'
            label='Last Name'
            fullWidth
            {...register("lastname")}
            sx={{
              mt: 3,
            }}
            error={Boolean(errors["lastname"]?.message)}
            helperText={errors.lastname?.message?.toString()}
          />
        </Box>
        <TextField
          placeholder='Email'
          label='Email'
          fullWidth
          sx={{
            mt: 3,
          }}
          {...register("email")}
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
          Create Account
        </Button>
      </form>

      <Box mt={2}>
        <Typography textAlign='left'>
          Have an account?{" "}
          <span
            role='link'
            onClick={() => navigate("/login")}
            style={{
              color: "#2574F5",
              cursor: "pointer",
            }}
          >
            {" "}
            Sign in
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
