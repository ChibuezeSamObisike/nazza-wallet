import React from "react";
import { Box, TextField, Typography, Divider } from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers";

import AppBreadCrumb from "shared/AppBreadCrumb";

export default function ProfileDetails() {
  const [value, setValue] = React.useState<any | null>(null);

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };
  return (
    <>
      <AppBreadCrumb links={[{ title: "Home", link: "/" }]} current='Profile' />
      <Box bgcolor='#fff' p={3} pt={5} mt={2}>
        <Box>
          <Typography mb={2} variant='body1' fontWeight='bold'>
            Personal Details
          </Typography>
          <Divider />
        </Box>
        <Box width='60%'>
          <TextField
            id='outlined-required'
            label='Name'
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='Olugwu Samuel'
          />
          <TextField
            id='outlined-required'
            label='Email'
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

          <TextField
            id='input-with-icon-textfield'
            label='Phone Number'
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='000000'
          />
        </Box>
      </Box>
    </>
  );
}
