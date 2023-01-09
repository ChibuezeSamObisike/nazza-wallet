import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import TextTag from "shared/TextTag";
import BasicTable from "shared/Table";

export default function WalletUI({
  bg,
  color,
}: {
  bg: string;
  color?: string;
}) {
  return (
    <div>
      <Box
        borderRadius='8px'
        py={7}
        px={12}
        color={color || ""}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Typography mb={1} fontWeight={400} variant='subtitle1'>
          Avaliable balance
        </Typography>
        <Typography fontWeight='bold' fontSize={pxToRem(62)}>
          0.0{" "}
          <span style={{ fontSize: pxToRem(12), fontWeight: "lighter" }}>
            BTC
          </span>
        </Typography>
        <Typography pt={3} fontWeight={400} variant='subtitle1' pb={2}>
          Dollar Value
        </Typography>
        <Typography fontWeight='bold' fontSize={pxToRem(28)}>
          0{" "}
          <span style={{ fontSize: pxToRem(12), fontWeight: "lighter" }}>
            USD
          </span>
        </Typography>
      </Box>

      <Box mt={4}>
        <TextTag label='Transactions' />
        <Box pt={3}>
          <BasicTable />
        </Box>
      </Box>
    </div>
  );
}
