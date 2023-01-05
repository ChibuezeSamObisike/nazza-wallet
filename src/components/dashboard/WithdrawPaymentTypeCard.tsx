import React from "react";
import { Box, Typography } from "@mui/material";
import bg from "assets/withdraw-card.svg";
import { ReactComponent as Withdraw } from "assets/Withdraw.svg";

export default function PaymentTypeCard() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
      py={5}
      pl={2}
      overflow='hidden'
      borderRadius='8px'
    >
      <Box pt={4}>
        <Withdraw />
      </Box>
      <Typography variant='subtitle2' fontWeight='bold' pt={2}>
        Withdraw
      </Typography>
      <Typography>Withdraw your crypto</Typography>
    </Box>
  );
}
