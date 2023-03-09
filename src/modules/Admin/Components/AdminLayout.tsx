import React from "react";
import { Box } from "@mui/material";

export default function AdminLayout({ children }: { children: any }) {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
      <Box width='20%' height='100vh' bgcolor='#fff'></Box>
      <Box width='100%' p='40px'>
        {children}
      </Box>
    </Box>
  );
}
