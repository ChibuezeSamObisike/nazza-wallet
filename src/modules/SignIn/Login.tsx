import { Typography, Box, TextField, Button } from "@mui/material";
import nazaLogo from "assets/naza-logo.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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

      <TextField
        placeholder='Email'
        label='Email'
        fullWidth
        sx={{
          mt: 3,
        }}
      />

      <TextField
        placeholder='Password'
        label='Password'
        fullWidth
        sx={{
          mt: 3,
        }}
      />

      <Button
        sx={{
          mt: 3,
          width: "100%",
        }}
        onClick={() => navigate("/")}
      >
        Login
      </Button>

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
        <Typography ml={2} color='#2574F5'>
          Create Account
        </Typography>
      </Typography>
    </Box>
  );
}
