import React from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function GenericModal({ children, open, close }: any) {
  return (
    <Modal
      open={open}
      onClose={close}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width='50%' bgcolor='#fff' my='auto' p={3} borderRadius='8px'>
        <Box justifyContent='flex-end' display='flex'>
          <IconButton onClick={() => close()}>
            <CloseIcon
              sx={{
                fontSize: "38px",
              }}
            />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
