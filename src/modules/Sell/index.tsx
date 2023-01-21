import React from "react";

import { Box } from "@mui/material";
import AppBreadCrumb from "shared/AppBreadCrumb";

export default function index() {
  return (
    <Box>
      <AppBreadCrumb
        links={[{ title: "Home", link: "/" }]}
        current='Sell Crypto'
      />
    </Box>
  );
}
