import React from "react";
import { ReactComponent as ResetEmail } from "assets/mail-sent.svg";
import { Box, Typography } from "@mui/material";

export default function ResetEmailSent() {
  return (
    <Box alignItems='center' textAlign='center'>
      <ResetEmail />

      <Box>
        <Typography variant='subtitle1' fontWeight='bold' mb={3}>
          Reset Password
        </Typography>

        <Typography color='#47454C' fontWeight={400}>
          A reset link has been sent to your email.
        </Typography>
      </Box>
    </Box>
  );
}
