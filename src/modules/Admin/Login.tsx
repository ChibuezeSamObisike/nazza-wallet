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
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAlert } from "hooks/useAlert";
import * as Yup from "yup";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AdminLogin = () => {
  const { showNotification } = useAlert();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: FieldValues) => {
    //return mutate({ data });
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
      bgcolor='#00368f'
      sx={{
        width: "100%",
        height: "100vh",
        position: "fixed",
      }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box bgcolor='#fff' width='30%' p={4}>
        <Box
          marginX='auto'
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={4}
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
        </Box>
        <Typography textAlign='center' fontWeight='bold' variant='subtitle1'>
          Welcome Admin
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
            // startIcon={
            //   isLoading && (
            //     <CircularProgress
            //       size={16}
            //       sx={{
            //         fontSize: 2,
            //         color: "#fff",
            //       }}
            //     />
            //   )
            // }
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
