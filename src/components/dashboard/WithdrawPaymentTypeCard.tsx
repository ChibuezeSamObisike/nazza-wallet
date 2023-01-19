import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import bg from "assets/withdraw-card.svg";
import { ReactComponent as Invite } from "assets/invite.svg";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export default function PaymentTypeCard() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
      py={5}
      pl={2}
      overflow='hidden'
      borderRadius='8px'
    >
      <Box pt={4}>
        <IconButton>
          <Invite />
        </IconButton>
      </Box>
      <Typography variant='subtitle2' fontWeight='bold' pt={2}>
        Invite
      </Typography>
      <Typography>Invite a friend and earn</Typography>
    </Box>
  );
}
