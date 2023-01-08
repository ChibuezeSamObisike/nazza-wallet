import React from "react";
import AppModal from "components/AppModal";
import { Box, Typography, Button } from "@mui/material";
import { pxToRem } from "utils/pxToRem";

export default function ConfirmSellModal({
  open,
  close,
  handleSuccessOpen,
}: {
  open: boolean;
  close: VoidFunction;
  handleSuccessOpen?: VoidFunction;
}) {
  return (
    <AppModal open={open} sxStyle={{ textAlign: "center" }} close={close}>
      <Box color='#5D5C63'>
        <Typography
          fontWeight={"bold"}
          variant='subtitle1'
          fontSize={pxToRem(28)}
        >
          Confirm Sell
        </Typography>

        <Typography fontSize={pxToRem(52)} pt={4} mb={2} fontWeight='bold'>
          234
          <span
            style={{
              fontSize: pxToRem(18),
              fontWeight: 500,
            }}
          >
            USD
          </span>
        </Typography>
        <Box>
          {renderPrice("Pay", "242NGN")}
          {renderPrice("BTC price", "0.0003 BTC")}
          {renderPrice("Rate", "0 NGN")}
          {renderPrice("Fee", "0 NGN")}
          {renderPrice("Payment Method", "Naira Wallet")}
        </Box>
        <Button
          sx={{
            mt: 3,
          }}
          disabled={false}
          fullWidth
          onClick={() => {
            close?.();
            handleSuccessOpen?.();
          }}
        >
          Confirm Sell
        </Button>
      </Box>
    </AppModal>
  );
}

function renderPrice(title: string, result: string) {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      my={2}
      color='#101628'
    >
      <Typography>{title}</Typography>
      <Typography>{result}</Typography>
    </Box>
  );
}
