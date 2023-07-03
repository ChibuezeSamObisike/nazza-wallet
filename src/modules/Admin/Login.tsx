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
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAlert } from "hooks/useAlert";
import * as Yup from "yup";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "services/AppService";
import handleApiError, { handleAppError } from "utils/handleApiError";
import { setToken } from "utils/auth";

const AdminLogin = () => {
  const { showNotification } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation(login);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    mutation.mutate(
      { data },
      {
        onSuccess(data) {
          const path = location?.state?.from ?? "/admin";
          showNotification?.("Login Successful", { type: "success" });
          setToken("adminToken", data?.accessToken);
          navigate(path);
        },
        onError(error) {
          showNotification?.(handleAppError(error) || handleApiError(error), {
            type: "error",
          });
          console.log(error);
        },
      }
    );
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
    <Box
      bgcolor="#00368f"
      sx={{
        width: "100%",
        height: "100vh",
        position: "fixed",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bgcolor="#fff" width="30%" p={4}>
        <Box
          marginX="auto"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={4}
        >
          <img
            src={nazaLogo}
            alt="logo"
            width={"123px"}
            style={{
              color: "red",
              marginBottom: 4,
            }}
          />
        </Box>
        <Typography textAlign="center" fontWeight="bold" variant="subtitle1">
          Welcome Admin
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Email"
            label="Email"
            fullWidth
            {...register("email")}
            sx={{
              mt: 3,
            }}
            error={Boolean(errors["email"]?.message)}
            helperText={errors.email?.message?.toString()}
          />

          <TextField
            placeholder="Password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
            type="submit"
            disabled={mutation.isLoading}
            startIcon={
              mutation.isLoading && (
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
      </Box>
    </Box>
  );
};

export default AdminLogin;
