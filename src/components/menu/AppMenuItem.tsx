import React from "react";
import { Box, Typography } from "@mui/material";

export default function AppMenuItem({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <Box
      display='flex'
      p={1}
      pl={2}
      my={2}
      sx={{
        ":hover": {
          bgcolor: "#EFF3FF",
        },
        width: "100%",
      }}
    >
      <Typography variant='body2' color='#001D4B' textAlign='left'>
        {label}
      </Typography>
    </Box>
  );
}
