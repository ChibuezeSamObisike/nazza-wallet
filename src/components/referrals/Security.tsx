import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Divider,
  styled,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAlert } from "hooks/useAlert";

import { useForm } from "react-hook-form";
import { handleAppError } from "utils/handleApiError";

import * as Yup from "yup";

import Switch, { SwitchProps } from "@mui/material/Switch";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword, toggle2fa } from "services/AppService";
import { AxiosError } from "axios";

export default function Security({ twofa }: { twofa: boolean }) {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName='.Mui-focusVisible'
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#1790ff",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const [showPassword, setShowPassword] = React.useState(false);
  const [check2fa, setCheck2fa] = React.useState(twofa);

  const defaultValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const schema = Yup.object({
    old_password: Yup.string(),
    new_password: Yup.string()
      .required("Password is Required")
      .min(6, "Minimum of 6 text"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Passwords must match"
    ),
  });

  const resolver = yupResolver(schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver, defaultValues });
  const { showNotification } = useAlert();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleToggleChange = (): void => {
    setCheck2fa((x) => !x);
    mutate2fa();
  };

  const { mutate, isLoading } = useMutation(resetPassword, {
    onSuccess(data) {
      showNotification?.("Password change was successfull", {
        type: "success",
      });
    },
    onError(error: AxiosError) {
      showNotification?.(handleAppError(error), {
        type: "error",
      });
    },
  });

  const { mutate: mutate2fa } = useMutation(toggle2fa, {
    onSuccess(data) {
      showNotification?.("2FA toggled Successfully", {
        type: "success",
      });
    },
    onError(error: AxiosError) {
      showNotification?.(handleAppError(error), {
        type: "error",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutate({ data });
  };
  return (
    <>
      <Box bgcolor='#fff' border='1px solid #D4D4D4' p={3} pt={5} mb={3}>
        <Typography fontWeight='bold'>2Factor Authentication</Typography>
        <Typography mt={2} fontWeight={300}>
          Changing your password regularly increases your account security
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography fontWeight={300}>Email OTP</Typography>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                checked={check2fa}
                onChange={handleToggleChange}
              />
            }
            label=''
          />
        </Box>
      </Box>
      <Box bgcolor='#fff' border='1px solid #D4D4D4' p={3} pt={5}>
        <Box>
          <Typography fontWeight='bold'>Change password</Typography>
          <Typography mt={2} fontWeight={300}>
            Changing your password regularly increases your account security
          </Typography>
          <Divider sx={{ my: 3 }} />
        </Box>

        <Box p={{ md: 0, xs: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='Old password'
              {...register("old_password")}
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{
                marginTop: "30px",
              }}
              error={Boolean(errors["old_password"]?.message)}
              helperText={errors.old_password?.message?.toString()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton>
                      {" "}
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label='New password'
              fullWidth
              {...register("new_password")}
              sx={{
                marginTop: "30px",
              }}
              error={Boolean(errors["new_password"]?.message)}
              helperText={errors.new_password?.message?.toString()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton>
                      {" "}
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label='Confirm password'
              {...register("confirm_password")}
              fullWidth
              sx={{
                marginTop: "30px",
              }}
              error={Boolean(errors["confirm_password"]?.message)}
              helperText={errors.confirm_password?.message?.toString()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton>
                      {" "}
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* <Typography mt={3} fontWeight={300}>
              Must contain at least 8 characters,{" "}
              <span
                style={{
                  color: "#52C41A",
                  marginRight: "4px",
                }}
              >
                one uppercase, one lowercase,
              </span>
              and{" "}
              <span
                style={{
                  color: "#52C41A",
                }}
              >
                one number or special character
              </span>
            </Typography> */}

            <Button
              fullWidth
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
                mt: 3,
              }}
            >
              Change password
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
