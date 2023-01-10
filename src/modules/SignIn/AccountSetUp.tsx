import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nazaLogo from "assets/naza-logo.svg";
import DoneIcon from "@mui/icons-material/Done";
import { pxToRem } from "utils/pxToRem";

export default function AccountSetUp() {
  const navigate = useNavigate();
  return (
    <Box mt={{ md: -30, xs: 0 }} sx={{ width: { md: "60%", xs: "100%" } }}>
      <img
        src={nazaLogo}
        alt='logo'
        width={"123px"}
        style={{
          color: "red",
          marginBottom: 4,
        }}
      />
      <Typography variant='subtitle1' fontWeight='bold'>
        Let’s setup your profile!
      </Typography>

      <Typography variant='subtitle2' fontWeight={400} fontSize={pxToRem(22)}>
        Please make sure the details are correct as they will be use used to
        verify your identity.
      </Typography>

      <TextField
        placeholder='Name'
        label='Name'
        fullWidth
        sx={{
          mt: 3,
        }}
      />
      <TextField
        placeholder='Username'
        label='Username'
        fullWidth
        sx={{
          mt: 3,
        }}
      />
      <TextField
        placeholder='Password'
        label='Password'
        fullWidth
        sx={{
          mt: 3,
        }}
      />

      <Button
        sx={{
          mt: 10,
          width: "70%",
        }}
        onClick={() => navigate("/verify")}
      >
        Create Account
      </Button>

      <Box mt={3}>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>At least 8 characters</Typography>
        </Box>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>At one upper case character</Typography>
        </Box>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>At least one number</Typography>
        </Box>
        <Box display='flex' mb={2} alignItems='center' color='#8C8B90'>
          <DoneIcon
            sx={{
              mr: 3,
            }}
          />
          <Typography>
            At least one number or special character (!@#&$)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
