import { Box, TextField, Typography, Button } from "@mui/material";
import TextTag from "shared/TextTag";

export default function KycVerification() {
  return (
    <Box bgcolor='#fff' p={3} pt={5}>
      <TextTag
        label='KYC Verification'
        style={{
          color: "#573A00",
          backgroundColor: "#FFF7E7",
          mb: 5,
        }}
      />
      <TextTag label='Level 1 - Verification' />
      <Typography fontWeight={400} mt={2} variant='body1'>
        Sell limit- 50k
      </Typography>

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
        label='Phone Number'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        placeholder='000000'
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

      <Box mt={10}>
        <TextTag label='Level 2 - Verification' />
        <Typography fontWeight={400} mt={2} variant='body1'>
          Sell limit- Unlimited
        </Typography>

        <Typography fontWeight={700} mt={3}>
          Status:{" "}
          <span
            style={{
              color: "#B3261E",
            }}
          >
            Incomplete
          </span>{" "}
        </Typography>

        <Box mt={4} border='1px solid #D4D4D4' borderRadius='4px' p={2}>
          <Typography mb={2} fontWeight={700}>
            Required Document
          </Typography>
          <Typography color='#8C8B90'>
            Any Government ID such as Driver’s License, NIN slip, International
            passportDate of Birth
          </Typography>
        </Box>
        <Box mt={3} mb={4}>
          <Button
            sx={{
              width: "100%",
            }}
            fullWidth
          >
            Get started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
