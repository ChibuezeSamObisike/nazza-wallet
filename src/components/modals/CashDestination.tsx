import React from "react";
import { Box, Typography, Button, Checkbox, IconButton } from "@mui/material";
import { pxToRem } from "utils/pxToRem";

import SwapVerticalCircleOutlinedIcon from "@mui/icons-material/SwapVerticalCircleOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SellSmallScreen from "shared/layout/SellSmallScreen";

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
  return (
    <SellSmallScreen title='Account' subtitle='Select your cash destination'>
      <Box
        color='#5D5C63'
        textAlign='center'
        bgcolor='#fff'
        p={4}
        borderRadius='16px'
        border='1px solid #A4A3A7'
      >
        <Box mb={2} width='100%' display='flex'>
          <IconButton onClick={back}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography fontSize={pxToRem(52)} pt={4} mb={2} fontWeight='bold'>
          0{" "}
          <span
            style={{
              fontSize: pxToRem(18),
              fontWeight: 500,
            }}
          >
            USD
          </span>
        </Typography>

        <Box display='flex' justifyContent='flex-end' mt={-10} mb={10} mr={5}>
          <Box display='flex' alignItems='center' justifyContent='space-around'>
            <IconButton>
              <SwapVerticalCircleOutlinedIcon
                sx={{
                  fontSize: pxToRem(33),
                  color: "#D4D4D4",
                }}
              />
            </IconButton>
            <Box>
              <Typography fontSize={pxToRem(16)}>USD</Typography>
              <Typography fontSize={pxToRem(12)} color='#D4D4D4'>
                NGN
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
  );
}
