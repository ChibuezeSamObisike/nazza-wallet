import { Box, Chip, Divider, Typography } from "@mui/material";
import React from "react";
import { Bitcoin } from "utils/iconsComponent";
import getChipColor from "utils/getChipColor";
import getIcon from "utils/getIcon";

interface IProps {
  chip: string;
  number: string;
  price: string;
  network: string;
  date: string;
  icon: string;
}

export default function MobileTransactionCard({
  chip,
  number,
  price,
  network,
  date,
  icon,
  ...rest
}: IProps) {
  return (
    <Box p={3} {...rest}>
      <Typography variant='body1' fontWeight={700} mb={2}>
        {date}
      </Typography>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <img src={getIcon(icon ?? "Bitcoin")} alt='Get icon' />
        <Chip
          label={chip}
          sx={{
            color: getChipColor(chip).text,
            bgcolor: getChipColor(chip).bg,
          }}
        />
      </Box>
      <Box
        bgcolor='#F7F7F7'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        p={2}
        mt={2}
      >
        <Typography color='#5D5C63'>Number</Typography>
        <Typography color='#101628' fontWeight={700}>
          {number}
        </Typography>
      </Box>
      <Box
        bgcolor='#FFF'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        p={2}
        mt={2}
      >
        <Typography color='#5D5C63'>Price (Naira)</Typography>
        <Typography color='#101628' fontWeight={700}>
          {price}
        </Typography>
      </Box>
      <Box
        bgcolor='#F7F7F7'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
        p={2}
        mt={2}
      >
        <Typography color='#5D5C63'>Network</Typography>
        <Typography color='#101628' fontWeight={700}>
          {network}
        </Typography>
      </Box>

      <Divider />
    </Box>
  );
}
