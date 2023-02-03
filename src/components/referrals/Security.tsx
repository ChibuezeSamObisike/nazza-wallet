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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Switch, { SwitchProps } from "@mui/material/Switch";

export default function Security() {
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Box bgcolor='#fff' p={3} pt={5} mb={3}>
        <Typography fontWeight='bold'>2Factor Authentication</Typography>
        <Typography mt={2} fontWeight={300}>
          Changing your password regularly increases your account security
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography fontWeight={300}>Email OTP</Typography>
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label=''
          />
        </Box>
      </Box>
      <Box bgcolor='#fff' p={3} pt={5}>
        <Box>
          <Typography fontWeight='bold'>Change password</Typography>
          <Typography mt={2} fontWeight={300}>
            Changing your password regularly increases your account security
          </Typography>
          <Divider sx={{ my: 3 }} />
        </Box>

        <Box p={{ md: 6, xs: 0 }}>
          <TextField
            id='outlined-required'
            label='Old password'
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{
              marginTop: "30px",
            }}
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
            id='outlined-required'
            label='New password'
            fullWidth
            sx={{
              marginTop: "30px",
            }}
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

          <Typography mt={3} fontWeight={300}>
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
          </Typography>

          <Button
            fullWidth
            sx={{
              mt: 3,
            }}
          >
            Change password
          </Button>
        </Box>
      </Box>
    </>
  );
}
