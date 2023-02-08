import React from "react";
import { Box } from "@mui/material";
import { PropagateLoader } from "react-spinners";

const Loader = ({ height = "100vh" }: { height?: string }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ height: height, width: "100%" }}
    >
      <PropagateLoader color='#2574F5' />
    </Box>
  );
};

export default Loader;
