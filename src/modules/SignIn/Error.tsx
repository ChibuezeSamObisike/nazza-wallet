import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Error() {
  return (
    <Box
      color='#101628'
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Typography mt={3} variant='subtitle1' fontWeight='bold'>
        Error
      </Typography>
      <Typography color='#47454C' fontWeight={300}>
        Your email address couldn’t be verified
      </Typography>

      <Button
        sx={{
          mt: 4,
          borderRadius: 0,
          px: 12,
        }}
      >
        Resend Verification Email
      </Button>
    </Box>
  );
}
