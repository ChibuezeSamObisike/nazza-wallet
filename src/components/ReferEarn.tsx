import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextTag from "shared/TextTag";

import { useAlert } from "hooks/useAlert";

export default function ReferEarn({ data }: any) {
  const { showNotification } = useAlert();
  return (
    <Box bgcolor='#fff' p={3} pt={5} border='1px solid #D4D4D4'>
      <TextTag label='Refer and Earn' />

      <TextField
        id='input-with-icon-textfield'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        disabled
        label='Refferral Link'
        defaultValue={`https://nazza-wallet.vercel.app/account-setup?ref=${data?.referral?.code}`}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `https://nazza-wallet.vercel.app/account-setup?ref=${data?.referral?.code}`
                    )
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
        sx={{
          mt: 4,
        }}
        fullWidth
      >
        Share
      </Button>
    </Box>
  );
}
