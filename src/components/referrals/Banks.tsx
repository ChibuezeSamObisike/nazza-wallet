import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import GenericModal from "components/modals/GenericModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { pxToRem } from "utils/pxToRem";

export default function Banks() {
  const [openM1, setOpenM1] = useState(false);
  const [openM2, setOpenM2] = useState(false);

  const closeM1 = () => {
    setOpenM1(false);
  };
  const closeM2 = () => {
    setOpenM2(false);
  };
  return (
    <>
      <GenericModal open={openM1} close={closeM1}>
        <Box
          textAlign='center'
          alignItems='center'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box
            bgcolor='#E9F1FF'
            height='53px'
            width='53px'
            borderRadius='50%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <AccountBalanceIcon sx={{ color: "#001D4B", fontSize: "32px" }} />
          </Box>
          <Typography my={2} fontWeight='bold'>
            Add a bank Account
          </Typography>

          <TextField fullWidth name='Bank_name' label='Bank Name' />
          <TextField
            fullWidth
            name='account_number'
            label='Account Number'
            sx={{
              my: 2,
            }}
          />

          <Button
            fullWidth
            onClick={() => {
              setOpenM1(false);
              setOpenM2(true);
            }}
          >
            Confirm
          </Button>
        </Box>
      </GenericModal>

      <GenericModal open={openM2} close={closeM2}>
        <Box
          textAlign='center'
          alignItems='center'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box
            bgcolor='#E9F1FF'
            height='53px'
            width='53px'
            borderRadius='50%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <AccountBalanceIcon sx={{ color: "#001D4B", fontSize: "32px" }} />
          </Box>
          <Typography fontSize={pxToRem(18)} my={2} fontWeight='bold'>
            You added a new bank account
          </Typography>

          <Typography color='#8C8B90' fontWeight={300} mb={2}>
            You can now recieve funds to this bank accounts
          </Typography>

          <Button onClick={() => closeM2()} fullWidth>
            Done
          </Button>
        </Box>
      </GenericModal>
      <Box bgcolor='#fff' p={3} pt={5} mb={3} border='1px solid #D4D4D4'>
        <Typography fontWeight='bold'>Banks</Typography>
        <Typography mt={2} fontWeight={300}>
          You can add your bank account where you will deposited
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box my={3}>
          <Box
            bgcolor='#E9F1FF'
            p={2}
            px={4}
            mb={4}
            mt={3}
            display='flex'
            color='#001D4B'
            alignItems='center'
            border='1px solid #E9F1FF'
            flexDirection={{ md: "row", xs: "column" }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography fontWeight='bold'>Ologwu Samuel</Typography>
            </Box>
            <Typography
              ml={6}
              variant='body2'
              fontWeight={400}
              display='flex'
              alignItems='center'
            >
              12********85 <Typography mx={3}> |</Typography> First Bank
            </Typography>
            <IconButton>
              <DeleteIcon
                sx={{
                  color: "#D53A32",
                  ml: { md: 3, xs: 0 },
                }}
              />
            </IconButton>
          </Box>

          <Button
            sx={{
              px: 20,
              mt: 5,
              borderRadius: "0px",
            }}
            onClick={() => setOpenM1(true)}
          >
            Add bank account
          </Button>
        </Box>
      </Box>
    </>
  );
}
