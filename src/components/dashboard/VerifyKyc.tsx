import { Box, Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function VerifyKyc() {
  const navigate = useNavigate();
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
      <IconButton onClick={() => navigate("referrals")}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}
