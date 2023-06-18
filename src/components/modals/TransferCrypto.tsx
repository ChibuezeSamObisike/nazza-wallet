import React from "react";

import {
  Box,
  Alert,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SellSmallScreen from "shared/layout/SellSmallScreen";
import { useSell } from "modules/Sell";
import { useAlert } from "hooks/useAlert";
import { useAmount } from "hooks/useAmount";

import QRCode from "react-qr-code";
import { pxToRem } from "utils/pxToRem";

export default function TransferCrypto({
  open,
  close,
  openNext,
}: {
  open?: boolean;
  close?: VoidFunction;
  openNext?: VoidFunction;
}) {
  const { viewData } = useSell();
  const { showNotification } = useAlert();
  const { convertToAmount } = useAmount(viewData.currency);

  React.useEffect(() => {
    console.log("View Data", viewData);
  }, []);
  return (
    <Box>
      <SellSmallScreen
        title='Transfer'
        subtitle='Send wallet and add to crypto '
      >
        <Box
          color='#5D5C63'
          bgcolor='#fff'
          p={4}
          borderRadius='16px'
          border='1px solid #A4A3A7'
        >
          <Box>
            <Typography variant='subtitle2' fontWeight='bold' color='black'>
              Transfer funds
            </Typography>

            <Typography mt={3}>
              Send{" "}
              <span
                style={{
                  color: "#2574F5",
                  marginRight: "4px",
                }}
              >
                {convertToAmount?.(viewData?.amount_usd)}
              </span>
              worth of {viewData?.coinName} to this address below or scan the QR
              code.
            </Typography>
            {!(viewData?.coinName === "BTC") && (
              <Alert
                severity='warning'
                sx={{
                  my: 3,
                }}
              >
                make sure you are sending to a{" "}
                {viewData.coinName === "USD" && "ERC 20 "}
                {viewData.coinName === "ETH" && "BEP 20 "}
                network.
              </Alert>
            )}

            <Box
              mx='auto'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Box border='1px solid grey'>
                <QRCode value={viewData?.address} />
              </Box>
            </Box>

            <Typography textAlign='center' mt={2} fontSize={pxToRem(16)}>
              Scan the QR code or copy the payment wallet
            </Typography>

            <TextField
              id='input-with-icon-textfield'
              fullWidth
              disabled
              sx={{
                marginTop: "30px",
              }}
              value={viewData?.address}
              InputLabelProps={{
                shrink: true,
              }}
              label='Address'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button
                      onClick={() => {
                        navigator.clipboard
                          .writeText(`${viewData?.address}`)
                          .then(() =>
                            showNotification?.("Text copy successful", {
                              type: "success",
                            })
                          );
                      }}
                      sx={{
                        p: 1,
                        px: 3,
                        backgroundColor: "#E9F1FF",
                        color: "#000000",
                        fontWeight: 500,
                      }}
                    >
                      <ContentCopyIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              onClick={() => openNext?.()}
              sx={{
                mt: 3,
                fontWeight: 400,
              }}
            >
              I have made the payment
            </Button>
          </Box>
        </Box>
      </SellSmallScreen>
    </Box>
  );
}
