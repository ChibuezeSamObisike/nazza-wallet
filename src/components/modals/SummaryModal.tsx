import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SellSmallScreen from "shared/layout/SellSmallScreen";
import { handleAppError } from "utils/handleApiError";

import { renderPrice } from "./ConfirmSell";
import { sellCoin } from "services/AppService";

import { useSell } from "modules/Sell";
import { useAlert } from "hooks/useAlert";
import { useMutation } from "react-query";

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
  const { sellVal } = useSell();
  const { showNotification } = useAlert();

  useEffect(() => {
    console.log("SellVal>1", sellVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isLoading } = useMutation(sellCoin, {
    onSuccess(data) {
      //openNext();
      console.log("Sell succcsss", data);
      showNotification?.("Sell triggered!", { type: "success" });
    },
    onError(error) {
      showNotification?.(handleAppError(error), { type: "error" });
    },
  });

  return (
    <SellSmallScreen title='Summary' subtitle='Preview summary'>
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
          {sellVal?.amount}
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
          startIcon={
            isLoading && (
              <CircularProgress
                size={16}
                sx={{
                  fontSize: 2,
                  color: "#fff",
                }}
              />
            )
          }
          onClick={() => mutate({ ...sellVal })}
        >
          Proceed to next step
        </Button>
      </Box>
    </SellSmallScreen>
  );
}
