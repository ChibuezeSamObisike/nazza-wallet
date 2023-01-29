import React, { useState } from "react";
import { ReactComponent as ResetEmail } from "assets/mail-sent.svg";
import { Box, Button, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useLocation, useNavigate } from "react-router-dom";

import { pxToRem } from "utils/pxToRem";

export default function VerifyEmail() {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue: any) => {
    setOtp(newValue);
  };

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{ width: { md: "60%", xs: "100%" } }}
        alignItems='center'
        textAlign='center'
      >
        <ResetEmail />

        <Typography variant='subtitle1' mt={3} fontWeight='bold'>
          You are almost there
        </Typography>

        <Typography
          mt={4}
          fontSize={pxToRem(18)}
          color='#47454C'
          fontWeight={400}
        >
          Input the code sent to{" "}
          <b> {location?.state?.email ?? "your email"}</b> <br /> to complete
          your sign up.
        </Typography>
        <Box
          mt={2}
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <MuiOtpInput
            sx={{
              maxWidth: "450px",
              ".MuiOtpInput-TextField": {
                borderRadius: "0px",
              },
              ".css-wn3d3h-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "0px",
                color: "#145CD3",
              },
            }}
            value={otp}
            onChange={handleChange}
            length={6}
            gap={1}
          />
          <Button
            onClick={() => navigate("/verified")}
            sx={{
              width: "100%",
              maxWidth: "450px",
              mt: 3,
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  );
}
