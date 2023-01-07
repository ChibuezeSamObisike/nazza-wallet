import React from "react";
import Navbar from "components/Navbar";
import { Box } from "@mui/material";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Box mb='-60px'>
        <Navbar />
      </Box>

      {children}
    </div>
  );
}
