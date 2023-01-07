import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextTag from "shared/TextTag";

export default function ReferEarn() {
  return (
    <Box bgcolor='#fff' p={3} pt={5}>
      <TextTag label='Refer and Earn' />
      <TextField
        id='outlined-required'
        label='Referral Code'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        placeholder='12356'
      />

      <TextField
        id='input-with-icon-textfield'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        label='Refferral Link'
        placeholder='43673894773hkdgjvhhckjcjkchvhcmcw'
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
                <ContentCopyIcon />
              </Button>
            </InputAdornment>
          ),
        }}
      />

      <Button
        sx={{
          mt: 4,
        }}
        fullWidth
      >
        Share
      </Button>
    </Box>
  );
}
