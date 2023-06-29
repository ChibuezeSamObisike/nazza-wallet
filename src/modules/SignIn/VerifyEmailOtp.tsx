import React from "react";
import { ReactComponent as ResetEmail } from "assets/mail-sent.svg";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAppError } from "utils/handleApiError";
import { useAlert } from "hooks/useAlert";

import { pxToRem } from "utils/pxToRem";
import { login2fa } from "services/AppService";
import { setToken } from "utils/auth";
import { getDecodedJwt } from "utils/auth";

export default function VerifyEmail() {
  const [otp, setOtp] = React.useState("");
  const { showNotification } = useAlert();

  const handleChange = (newValue: string | number) => {
    setOtp(newValue.toString());
  };

  const location = useLocation();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(login2fa, {
    onSuccess(data) {
      console.log("2 fa data", data);
      showNotification?.("Login Successful", { type: "success" });
      setToken(data?.accessToken);
      navigate("/");
      getDecodedJwt();
    },
    onError(error) {
      showNotification?.(handleAppError(error), { type: "error" });
    },
  });

  const handleSubmit = (): void => {
    mutate({ email: location?.state?.email, code: otp });
  };

  return (
    <>
      <Box alignItems='center' textAlign='center'>
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
          An email was sent to <b> {location?.state?.email ?? "your email"}</b>{" "}
          <br /> to complete your sign up.
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
            length={5}
            gap={1}
          />
          <Button
            onClick={() => handleSubmit()}
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
