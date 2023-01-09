import React from "react";
import { Box, Typography } from "@mui/material";
import nazaLogo from "assets/naza-logo.svg";

export default function VerifyEmail() {
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

      <Typography variant='subtitle1' mt={3} fontWeight='bold'>
        Thank you for signing up!
      </Typography>

      <Typography mt={4}>
        We have sent a verification link to <b>nazapay@gmail.com.</b> <br />{" "}
        Click the link in the email to verify your account and set up your
        profile
      </Typography>

      <Typography display='flex' mt={4} alignItems='center'>
        Didn't get email?
        <Typography ml={2} color='#2574F5'>
          Click here to resend
        </Typography>
      </Typography>
    </Box>
  );
}
