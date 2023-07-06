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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
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

  return (
    <Box>
      <SellSmallScreen
        title="Transfer"
        subtitle="Send wallet and add to crypto "
      >
        <Box
          color="#5D5C63"
          bgcolor="#fff"
          p={4}
          borderRadius="16px"
          border="1px solid #A4A3A7"
        >
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" color="black">
              Transfer funds
            </Typography>

            <Typography mt={3} sx={{ textAlign: "center" }}>
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
            <Box
              mx="auto"
              marginTop="31px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                border="1px solid #2574F5"
                borderRadius="19px"
                height="156px"
                width="156px"
                padding={2}
                marginBottom={3}
              >
                <QRCode
                  style={{ height: "100%", width: "100%" }}
                  value={viewData?.address}
                />
              </Box>
            </Box>

            {viewData.coinName !== "BTC" && (
              <Alert
                severity="warning"
                sx={{
                  borderRadius: "7px",
                  border: "1px solid #FFE58F",
                  background: "#FFF7E7",
                  mb: 3,
                  color: "#001D4B",
                }}
                icon={<WarningAmberIcon sx={{ color: "#001D4B" }} />}
              >
                make sure you are sending to a{" "}
                {viewData.coinName === "USD" && "ERC 20 "}
                {viewData.coinName === "ETH" && "BEP 20 "}
                network.
              </Alert>
            )}

            <TextField
              id="input-with-icon-textfield"
              fullWidth
              disabled
              sx={{
                borderRadius: "4px",
                background: "#FAFBFF",
              }}
              value={viewData?.address}
              InputLabelProps={{
                shrink: true,
              }}
              label="Address"
              InputProps={{
                disableUnderline: true,
                style: { border: "none" },
                endAdornment: (
                  <InputAdornment position="end">
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
                        backgroundColor: "#FAFBFF",
                        color: "#2574F5",
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
