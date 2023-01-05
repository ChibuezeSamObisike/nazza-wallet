import { Box, Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function VerifyKyc() {
  return (
    <Box
      bgcolor='background.totalCard'
      my='40px'
      p='24px'
      borderRadius='8px'
      alignItems='center'
      display='flex'
      justifyContent='space-between'
    >
      <Box>
        <Typography variant='subtitle2' fontWeight={700}>
          Verify KYC
        </Typography>
        <Typography variant='body1' fontWeight={400}>
          we need some information to complete your account verification
        </Typography>
      </Box>
      <IconButton onClick={() => console.log("Hello world")}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}
