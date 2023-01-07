import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import bg from "assets/sell-card.svg";
import { ReactComponent as Send } from "assets/Send.svg";

export default function PaymentTypeCard() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        cursor: "pointer",
      }}
      py={5}
      pl={2}
      borderRadius='8px'
      overflow='hidden'
    >
      <Box pt={4}>
        <IconButton>
          <Send />
        </IconButton>
      </Box>
      <Typography variant='subtitle2' fontWeight='bold' pt={2}>
        Sell Cryptocurrency
      </Typography>
      <Typography>Sell crypto with your local currency</Typography>
    </Box>
  );
}
