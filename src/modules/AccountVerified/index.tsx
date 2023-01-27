import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { verify } from "services/authLogin";

import { AxiosError } from "axios";

import successGif from "assets/succesful-gif.gif";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { useAlert } from "hooks/useAlert";
import { useNavigate } from "react-router-dom";

import { handleAppError } from "utils/handleApiError";
import Loader from "shared/Loader";

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();

  function useSeparateParams(urlParam: string) {
    return [
      urlParam.split("&")[0].replace("?", "").split("=")[1],
      urlParam.split("&")[1].split("=")[1],
    ];
  }

  const { showNotification } = useAlert();

  const [id, code] = useSeparateParams(location.search);

  const { mutate, isLoading, error } = useMutation(verify, {
    onSuccess(data) {
      showNotification?.("Success", { type: "success" });

      navigate("/verify");
    },
    onError(error: AxiosError) {
      showNotification?.(handleAppError(error), {
        type: "error",
      });
    },
  });

  React.useEffect(() => {
    mutate({ id, code });
  }, [id, code]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='white'
    >
      <Box width={{ md: "30%", xs: "80%" }} textAlign='center'>
        <img src={successGif} alt='Img' width='350' />
        <Box mt={3}>
          <Typography fontWeight='bold' variant='h3'>
            Account Verified!
          </Typography>

          <Typography mt={2}>Your account was successfully verified</Typography>
        </Box>

        <Button
          onClick={() => navigate("/login")}
          type='submit'
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
