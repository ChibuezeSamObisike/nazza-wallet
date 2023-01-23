import { Box, Typography } from "@mui/material";
import React from "react";

export default function TextTag({
  label,
  style,
}: {
  label: string;
  style?: any;
}) {
  return (
    <Box
      bgcolor='#FFFFFF'
      borderRadius='8px'
      p='10px'
      color='#101628'
      sx={{ ...style }}
    >
      <Typography variant='subtitle2' fontWeight='bold'>
        {label}
      </Typography>
    </Box>
  );
}
