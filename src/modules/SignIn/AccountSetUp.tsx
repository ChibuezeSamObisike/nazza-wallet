import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import nazaLogo from "assets/naza-logo.svg";
import DoneIcon from "@mui/icons-material/Done";
import { pxToRem } from "utils/pxToRem";

import { AxiosError } from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";

import { useMutation } from "react-query";

import { register as registerService } from "services/authLogin";

import { handleAppError } from "utils/handleApiError";

import { useAlert } from "hooks/useAlert";

import * as Yup from "yup";

export default function AccountSetUp() {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const {
    mutate,
    isLoading,
    error: mutationError,
  } = useMutation(registerService, {
    onSuccess(data) {
      showNotification?.("Success", { type: "success" });
      console.log("auth data", data);
      navigate("/verify");
    },
    onError(error: AxiosError) {
      console.log("onError", error.response);
      showNotification?.(handleAppError(error), {
        type: "error",
      });
    },
  });
  const [passTest, setPassTest] = React.useState({
    atleast8: false,
    uppercase: false,
    oneNumber: false,
    specialChar: false,
  });

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Type most be email"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Minimum of 6 text"),
    name: Yup.string().required("Name is Required"),
  });

  const resolver = yupResolver(schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver, defaultValues });

  const onSubmit = (data: FieldValues) => {
    console.log("data", data);
    mutate({ data });
  };
  return (
    <Box mt={{ md: -30, xs: 0 }} sx={{ width: { md: "60%", xs: "100%" } }}>
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
        Let’s setup your profile!
      </Typography>

      <Typography variant='subtitle2' fontWeight={400} fontSize={pxToRem(22)}>
        Please make sure the details are correct as they will be use used to
        verify your identity.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder='Name'
          label='Name'
          fullWidth
          {...register("name")}
          sx={{
            mt: 3,
          }}
          error={Boolean(errors["name"]?.message)}
          helperText={errors.name?.message?.toString()}
        />
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
          {...register("password")}
          error={Boolean(errors["password"]?.message)}
          helperText={errors.password?.message?.toString()}
          fullWidth
          sx={{
            mt: 3,
          }}
        />

        <Button
          sx={{
            mt: 10,
            width: "70%",
          }}
          type='submit'
          // onClick={() => navigate("/verify")}
        >
          {isLoading ? (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <CircularProgress
                sx={{
                  width: "15px",
                  color: "#fff",
                  marginRight: 3,
                }}
              />{" "}
              <Typography>Creating Account</Typography>
            </Box>
          ) : (
            <Typography>Create Account</Typography>
          )}
        </Button>
      </form>
      <Box mt={3}>
        <Box
          display='flex'
          mb={2}
          alignItems='center'
          color={passTest.atleast8 ? "" : "#8C8B90"}
        >
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>At least 8 characters</Typography>
        </Box>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>At one upper case character</Typography>
        </Box>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>At least one number</Typography>
        </Box>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>
            At least one number or special character (!@#&$)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
