import React from "react";
import { Modal, Box, Typography, IconButton, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  children: React.ReactNode;
  open?: boolean;
  close?: VoidFunction;
  sxStyle?: React.CSSProperties;
}

export default function AppModal({
  children,
  open = false,
  close,
  sxStyle,
}: IProps) {
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
    borderRadius: { md: "16px", xs: 0 },
  };
  return (
    <Modal open={open}>
      <Box
        sx={{ ...style, ...sxStyle }}
        bgcolor={"red"}
        p={4}
        ml={{
          xs: 0,
          md: 0,
        }}
      >
        <Container
          sx={{
            p: { xs: 4, md: 0 },
          }}
        >
          <Box display='flex' alignItems='flex-end' justifyContent='flex-end'>
            <IconButton onClick={() => close?.()}>
              <CloseIcon
                sx={{
                  fontSize: 34,
                }}
              />
            </IconButton>
          </Box>
          {children}
        </Container>
      </Box>
    </Modal>
  );
}
