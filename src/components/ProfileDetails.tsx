import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
  Alert,
  ThemeOptions,
  ThemedProps,
} from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useQuery } from "react-query";

import AppBreadCrumb from "shared/AppBreadCrumb";
import { getProfileDetails } from "services/authLogin";

export default function ProfileDetails() {
  const [value, setValue] = React.useState<any | null>(null);

  const { data, isLoading } = useQuery("fetchUserDetails", getProfileDetails, {
    onSuccess(data) {
      console.log("fetch user data", data);
    },
  });

  useEffect(() => {
    console.log("Data tool", data);
  }, [data]);

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
        }}
        open={!!isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <AppBreadCrumb links={[{ title: "Home", link: "/" }]} current='Profile' />
      <Box bgcolor='#fff' p={3} pt={5} mt={2}>
        <Box>
          <Typography mb={2} variant='body1' fontWeight='bold'>
            Personal Details
          </Typography>
          <Divider />
        </Box>
        <Box width={{ xs: "100%", md: "60%" }}>
          <TextField
            id='outlined-required'
            label='Name'
            value={data?.name}
            fullWidth
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              marginTop: "30px",
            }}
            placeholder='Olugwu Samuel'
          />
          <TextField
            id='outlined-required'
            label='Email'
            disabled
            value={data?.email}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='Ogbonnasamuel67@gmail.com'
          />

          <TextField
            id='input-with-icon-textfield'
            label='Username'
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='sampato'
          />

          <TextField
            id='input-with-icon-textfield'
            label='Phone Number'
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='000000'
          />
          <Alert
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
            severity='info'
          >
            We recommend you use your WhatsApp number
          </Alert>

          <DesktopDatePicker
            label='Date'
            inputFormat='MM/DD/YYYY'
            value={value}
            onChange={handleChange}
            renderInput={(params: any) => (
              <TextField
                fullWidth
                sx={{
                  backgroundColor: "#E9F1FF",
                  color: "#000000",
                  fontWeight: 500,
                  bgcolor: "#fff",
                  marginTop: "30px",
                }}
                {...params}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
}
