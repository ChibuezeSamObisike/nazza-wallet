import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import TextTag from "shared/TextTag";
import { DesktopDatePicker } from "@mui/x-date-pickers";

export default function ProfileDetails() {
  const [value, setValue] = React.useState<any | null>(null);

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };
  return (
    <Box bgcolor='#fff' p={3} pt={5}>
      <TextTag
        label='Profile Details'
        style={{
          color: "#573A00",
          backgroundColor: "#FFF7E7",
        }}
      />
      <TextField
        id='outlined-required'
        label='Name'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        defaultValue='Olugwu Samuel'
      />
      <TextField
        id='outlined-required'
        label='Email'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        defaultValue='Ogbonnasamuel67@gmail.com'
      />

      <TextField
        id='input-with-icon-textfield'
        label='Username'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        defaultValue='sampato'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                sx={{
                  p: 1,
                  px: 3,
                  backgroundColor: "#E9F1FF",
                  color: "#000000",
                  fontWeight: 500,
                }}
              >
                Edit
              </Button>
            </InputAdornment>
          ),
        }}
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
        defaultValue='000000'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                sx={{
                  p: 1,
                  px: 3,
                  backgroundColor: "#E9F1FF",
                  color: "#000000",
                  fontWeight: 500,
                }}
              >
                Edit
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
