import React from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Select,
  Button,
  MenuItem,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import { ReactComponent as Bitcoin } from "assets/Bitcoin.svg";
import SwapVerticalCircleOutlinedIcon from "@mui/icons-material/SwapVerticalCircleOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { renderPrice } from "./ConfirmSell";

export default function SummaryModal({
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
      <Typography
        fontSize={pxToRem(52)}
        pt={4}
        mb={2}
        color='#2574F5'
        fontWeight='bold'
      >
        234
        <span
          style={{
            fontSize: pxToRem(18),
            fontWeight: 500,
            color: "#5D5C63",
          }}
        >
          USD
        </span>
      </Typography>

      <Typography>1 BTC ~ N780</Typography>

      <Divider
        style={{
          color: "#A4A3A7",
          height: "10px",
          margin: "40px 0px",
        }}
      />

      <Box mt={3}>
        {renderPrice("Coin", "USDT")}
        {renderPrice("Amount", "NGN 25,000")}
        {renderPrice("Cash Destination", "Bank")}

        {renderPrice("Amount Paid", "234 USDT")}
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
  );
}
