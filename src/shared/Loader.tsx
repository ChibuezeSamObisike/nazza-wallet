import React from "react";
import { Box } from "@mui/material";
import { DotLoader } from "react-spinners";

const Loader = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ height: "100vh", width: "100%" }}
    >
      <DotLoader />
    </Box>
  );
};

export default Loader;
