import React from "react";
import { Box, Typography } from "@mui/material";

export default function TextTag({
  label,
  style,
}: {
  label: string;
  style?: React.CSSProperties;
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
