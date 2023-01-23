import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { ReactComponent as AccountVerified } from "assets/verified.svg";

export default function index() {
  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box width='30%' textAlign='center'>
        <AccountVerified />
        <Box mt={3}>
          <Typography fontWeight='bold' variant='h3'>
            Account Verified!
          </Typography>

          <Typography mt={2}>Your account was successfully verified</Typography>
        </Box>

        <Button
          sx={{
            width: "100%",
            mt: 5,
            borderRadius: 0,
            bgcolor: "#2574F5",
            ":hover": {
              bgcolor: "#2574F5",
            },
          }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}
