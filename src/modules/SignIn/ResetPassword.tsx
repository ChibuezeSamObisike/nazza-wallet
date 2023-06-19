import { useEffect, useState } from "react";

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
import { useNavigate, useLocation } from "react-router-dom";

import { useMutation } from "react-query";
import http from "utils/http";
import { AxiosError } from "axios";
import * as Yup from "yup";

import { useForm, FieldValues } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { yupResolver } from "@hookform/resolvers/yup";
import { handleAppError } from "utils/handleApiError";

import { useAlert } from "hooks/useAlert";

export default function Login() {
  function useSeparateParams(urlParam: string) {
    return [
      urlParam?.split("&")[0].replace("?", "").split("=")[1],
      urlParam?.split("&")[1].split("=")[1],
    ];
  }

  const location = useLocation();
  const { showNotification } = useAlert();

  const [id, code] = useSeparateParams(location.search);

  useEffect(() => {
    if (!id && !code) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isLoading } = useMutation(
    async (data: any) => {
      return http.put(`user/newpassword/${id}/${code}`, data).then((res) => {
        return res.data;
      });
    },
    {
      onSuccess(data) {
        showNotification?.("Success", { type: "success" });

        navigate("/login");
      },
      onError(error: AxiosError) {
        showNotification?.(handleAppError(error), {
          type: "error",
        });
      },
    }
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    mutate({
      new_password: data?.password,
      confirm_password: data?.passwordConfirmation,
    });
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
