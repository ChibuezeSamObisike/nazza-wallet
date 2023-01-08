import { Box, Chip, Divider, Typography } from "@mui/material";
import React from "react";
import { Bitcoin } from "utils/iconsComponent";
import getChipColor from "utils/getChipColor";

export default function MobileTransactionCard() {
  return (
    <Box p={3}>
      <Typography variant='body1' fontWeight={700}>
        27th Jun, 2022, 22:30 pm
      </Typography>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Bitcoin />
        <Chip
          label='Sell'
          sx={{
            color: getChipColor("Sell").text,
            bgcolor: getChipColor("Sell").bg,
          }}
        />
      </Box>
      <Box
        bgcolor='#F7F7F7'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography color='#5D5C63'>Number</Typography>
        <Typography>1.6BTC</Typography>
      </Box>
      <Box
        bgcolor='#FFF'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography color='#5D5C63'>Price (Naira)</Typography>
        <Typography>N23,000</Typography>
      </Box>
      <Box
        bgcolor='#F7F7F7'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
      >
        <Typography color='#5D5C63'>Network</Typography>
        <Typography>BNB</Typography>
      </Box>

      <Divider />
    </Box>
  );
}
