import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AppMenuItem({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  const navigate = useNavigate();
  return (
    <Box
      display='flex'
      p={1}
      pl={2}
      sx={{
        ":hover": {
          bgcolor: "#EFF3FF",
        },
      }}
      onClick={() => navigate(path)}
    >
      <Typography variant='body2' color='primary' textAlign='left'>
        {label}
      </Typography>
    </Box>
  );
}
