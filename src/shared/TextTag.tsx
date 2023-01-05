import { Box, Typography } from "@mui/material";
import React from "react";

export default function TextTag({ label }: { label: string }) {
  return (
    <Box bgcolor='background.totalCard' borderRadius='8px' p='10px'>
      <Typography variant='subtitle2' fontWeight='bold'>
        {label}
      </Typography>
    </Box>
  );
}
