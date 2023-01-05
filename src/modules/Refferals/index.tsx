import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/dashboard/Sidebar";

export default function index({ children }: { children: any }) {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Box
        height='100vh'
        sx={{
          position: "fixed",
        }}
        borderRight='1px solid #EBEBEB'
        minWidth='30%'
      >
        <Sidebar />
      </Box>
      <Box ml='30%'>Hi</Box>
    </Box>
  );
}
