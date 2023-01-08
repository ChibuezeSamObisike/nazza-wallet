import React from "react";
import { Modal, Box, Typography } from "@mui/material";

export default function SellModal() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: 637, xs: "100vw" },
    height: { md: "auto", xs: "100vh" },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={true}>
      <Box
        sx={style}
        bgcolor={"red"}
        p={4}
        ml={{
          xs: 2,
          md: 0,
        }}
      >
        <Typography variant='subtitle1' fontWeight={"bold"} color='#47454C'>
          How much do you want to sell?
        </Typography>
      </Box>
    </Modal>
  );
}
