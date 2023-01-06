import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/dashboard/Sidebar";
import ProfileDetails from "components/referrals/ProfileDetails";
import KycVerification from "components/referrals/KycVerification";
import Security from "components/referrals/Security";

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
      <Box
        ml='30%'
        paddingRight='20%'
        pt={6}
        pl={6}
        bgcolor='#f8f8f8'
        width='100%'
        height='100vh'
      >
        <Security />
      </Box>
    </Box>
  );
}
