import React from "react";
import { Box, Typography } from "@mui/material";

import bg from "assets/deposit-card.svg";

import { ReactComponent as Deposit } from "assets/deposit.svg";

export default function DepositPaymentTypeCard() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
      overflow='hidden'
      py={5}
      pl={2}
      borderRadius='8px'
    >
      <Box pt={4}>
        <Deposit />
      </Box>
      <Typography variant='subtitle2' fontWeight='bold' pt={2}>
        Deposit Cryptocurrency
      </Typography>
      <Typography>Deposit crypto to your local currency</Typography>
    </Box>
  );
}
