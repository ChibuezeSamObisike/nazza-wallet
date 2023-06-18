import React from "react";

import { Box, Typography, Button } from "@mui/material";

import SellSmallScreen from "shared/layout/SellSmallScreen";

import loadingGif from "assets/loading-sucess.gif";
import { useNavigate } from "react-router-dom";

export default function TransferProcessing({
  open,
  close,
  openNext,
}: {
  open?: boolean;
  close?: VoidFunction;
  openNext?: VoidFunction;
}) {
  const navigate = useNavigate();
  return (
    <Box>
      <SellSmallScreen title='' subtitle=''>
        <Box
          color='#5D5C63'
          bgcolor='#fff'
          p={4}
          borderRadius='16px'
          border='1px solid #A4A3A7'
          textAlign='center'
        >
          <Box>
            <Box
              mx='auto'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <img src={loadingGif} alt='Loading' height='100px' width='100%' />
            </Box>

            <Typography variant='subtitle2' fontWeight='bold' color='black'>
              Transaction In Progress
            </Typography>

            <Typography fontWeight={300} my={4}>
              Your transaction has been submitted for processing
            </Typography>

            <Button
              fullWidth
              onClick={() => navigate("/")}
              sx={{
                mt: 5,
                fontWeight: 400,
              }}
            >
              Go home
            </Button>

            <Button
              fullWidth
              sx={{
                mt: 2,
              }}
              component='a'
              href='https://wa.me/2348182681223'
              target='_blank'
              variant='outlined'
            >
              Chat with us?
            </Button>
          </Box>
        </Box>
      </SellSmallScreen>
    </Box>
  );
}
