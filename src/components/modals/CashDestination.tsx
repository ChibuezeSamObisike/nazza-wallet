import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";

import SwapVerticalCircleOutlinedIcon from "@mui/icons-material/SwapVerticalCircleOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SellSmallScreen from "shared/layout/SellSmallScreen";
import GenericModal from "./GenericModal";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function CashDestination({
  open,
  close,
  openNext,
  back,
}: {
  open?: boolean;
  close?: VoidFunction;
  openNext?: VoidFunction;
  back?: VoidFunction;
}) {
  const [openM1, setOpenM1] = useState(false);
  const [openM2, setOpenM2] = useState(false);

  const closeM1 = () => {
    setOpenM1(false);
  };
  const closeM2 = () => {
    setOpenM2(false);
  };

  const [toggleCurr, setToggleCurr] = useState("NGN");

  const toggleCurrency = (): void => {
    if (toggleCurr === "NGN") {
      setToggleCurr("USD");
    } else {
      setToggleCurr("NGN");
    }
  };

  const getAltCurrency = (): string => {
    if (toggleCurr === "NGN") {
      return "USD";
    } else {
      return "NGN";
    }
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
      <SellSmallScreen title='Account' subtitle='Select your cash destination'>
        <Box
          color='#5D5C63'
          textAlign='center'
          bgcolor='#fff'
          p={{ md: 4, xs: 2 }}
          borderRadius='16px'
          border='1px solid #A4A3A7'
        >
          <Box mb={2} width='100%' display='flex'>
            <IconButton onClick={back}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography
            fontSize={pxToRem(52)}
            pt={3}
            mb={2}
            fontWeight='bold'
            sx={{
              position: "relative",
            }}
          >
            <TextField
              placeholder='0'
              variant='standard'
              sx={{
                fontWeight: "bold",
                fontSize: 40,
                textAlign: "center",
                mx: "auto",
                ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                  color: "#000",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "40px",
                },
                ".css-1x51dt5-MuiInputBase-input-MuiInput-input::placeholder": {
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "40px",
                  textAlign: "center",
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <span
              style={{
                fontSize: pxToRem(18),
                fontWeight: 500,
                position: "absolute",
                bottom: "0",
                right: "140px",
              }}
            >
              USD
            </span>
          </Typography>

          <Box
            display='flex'
            justifyContent='flex-end'
            mt={-10}
            mb={10}
            mr={{ md: 5, xs: 0 }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-around'
            >
              <IconButton onClick={() => toggleCurrency()}>
                <SwapVerticalCircleOutlinedIcon
                  sx={{
                    fontSize: pxToRem(33),
                    color: "#D4D4D4",
                  }}
                />
              </IconButton>
              <Box>
                <Typography fontSize={pxToRem(16)}>{toggleCurr}</Typography>
                <Typography fontSize={pxToRem(12)} color='#D4D4D4'>
                  {getAltCurrency()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography>1 BTC ~ N1</Typography>

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
            <Box display='flex' alignItems='center'>
              <Checkbox
                defaultChecked
                sx={{
                  mr: 3,
                }}
              />
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
          </Box>

          <Box
            color='#001D4B'
            onClick={() => setOpenM1(true)}
            component={Button}
            fullWidth
            bgcolor='#E9F1FF'
            mt={2}
            mb={4}
            sx={{
              p: 2,
            }}
          >
            <Typography variant='body1' fontWeight='bold'>
              + Add payment destination
            </Typography>
          </Box>

          <Button
            sx={{
              mt: 3,
            }}
            disabled={false}
            fullWidth
            onClick={() => openNext?.()}
          >
            Proceed to next step
          </Button>
        </Box>
      </SellSmallScreen>
    </>
  );
}
