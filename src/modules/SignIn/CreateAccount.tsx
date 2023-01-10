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
        Create your account
      </Typography>

      <TextField
        placeholder='Email'
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
        onClick={() => navigate("/verify")}
      >
        Create Account
      </Button>

      <Typography display='flex' mt={2} alignItems='center'>
        Have an account?{" "}
        <Typography ml={2} color='#2574F5'>
          Sign in
        </Typography>
      </Typography>
    </Box>
  );
}
