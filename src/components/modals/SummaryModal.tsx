import React from "react";
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
import { numberToFigure } from "utils/numberToFigure";

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
  const { sellVal, viewData, setViewData } = useSell();
  const { showNotification } = useAlert();

  const { mutate, isLoading } = useMutation(sellCoin, {
    onSuccess(data) {
      console.log("Sell succcsss", data);
      setViewData({
        ...viewData,
        address: data?.trade?.address,
        amount_usd: data?.trade?.amount_usd,
      });
      showNotification?.("Sucessful", { type: "success" });
      openNext!();
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
          {(viewData?.coinValue / sellVal?.amount).toFixed(4)}
          <span
            style={{
              fontSize: pxToRem(18),
              fontWeight: 500,
              color: "#5D5C63",
            }}
          >
            {viewData?.coinName}
          </span>
        </Typography>
        <Typography>
          {viewData?.coinName} RATE ~ {viewData?.coinValue} ₦/$
        </Typography>

        <Divider
          style={{
            color: "#A4A3A7",
            height: "10px",
            margin: "40px 0px",
          }}
        />

        <Box mt={3}>
          {renderPrice("Coin", `${viewData?.coinName}`)}
          {renderPrice(
            "Total payout",
            `NGN ${numberToFigure?.(sellVal?.amount * viewData?.coinValue)}`
          )}
          {renderPrice("Cash Destination", "Bank")}

          {renderPrice("Amount Paid", `${sellVal?.amount} USDT`)}
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
          onClick={() => {
            mutate({ ...sellVal, amount: +sellVal?.amount });
          }}
        >
          Proceed to next step
        </Button>
      </Box>
    </SellSmallScreen>
  );
}
