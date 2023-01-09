import React, { useState } from "react";
import { Box, Button, Select, Typography, MenuItem } from "@mui/material";
import { ReactComponent as Bitcoin } from "assets/Bitcoin.svg";
import { ReactComponent as Ethereum } from "assets/ethereum.svg";
import { ReactComponent as Usdt } from "assets/usdt.svg";
import WalletUI from "components/dashboard/WalletUI";

import useSmallScreen from "hooks/useSmallScreen";

import orangeBg from "assets/orange-wallet.svg";
import greenBg from "assets/green-wallet.svg";
import greyBg from "assets/grey-wallet.svg";

const styleCard = {
  background: "none",
  color: "#8C8B90",
  border: "1px solid #A4A3A7",
  borderRadius: "16px",

  ".focus, :hover": {
    color: "#8C8B90",
    border: "1px solid #A4A3A7",
    borderRadius: "16px",
  },

  ":hover": {
    background: "white",
    transform: "scale(1.03)",
    transition: "ease-in-out",
  },
};

export default function Wallet() {
  const [active, setActive] = useState(0);
  const isMobile = useSmallScreen();
  return (
    <div>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          sx={{
            marginRight: "20px",
            px: 10,
          }}
        >
          Deposit
        </Button>
        <Button
          sx={{
            px: 10,
          }}
          color='secondary'
        >
          Sell
        </Button>
      </Box>

      {isMobile && (
        <Box
          display={"flex"}
          alignItems='center'
          justifyContent={"center"}
          my={3}
        >
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={active}
            label='Age'
            onChange={(val) => {
              setActive(Number(val.target.value));
            }}
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "0px solid #484850",
                borderRadius: "0px",
              },
            }}
          >
            <MenuItem defaultValue={0} value={0}>
              <Box
                display='flex'
                justifyContent={"space-between"}
                alignItems='center'
              >
                <Bitcoin />
                <Typography ml={2}>Bitcoin</Typography>
              </Box>
            </MenuItem>
            <MenuItem value={1}>
              <Box
                display='flex'
                justifyContent={"space-between"}
                alignItems='center'
              >
                <Ethereum />
                <Typography ml={2}>Ethereum</Typography>
              </Box>
            </MenuItem>
            <MenuItem value={2}>
              <Box
                display='flex'
                justifyContent={"space-between"}
                alignItems='center'
              >
                <Usdt />
                <Typography ml={2}>USDT</Typography>
              </Box>
            </MenuItem>
          </Select>
        </Box>
      )}

      {!isMobile && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mt='40px'
          mb='40px'
        >
          <Button
            onClick={() => setActive(0)}
            sx={{
              mr: 2,
              ...styleCard,

              ...(active === 0 && {
                background: "#F7931A3D",
                color: "#522F05",
                border: "0px",
                p: "21px",
              }),
            }}
            fullWidth
          >
            <Bitcoin style={{ marginRight: "10px" }} />
            Bitcoin
          </Button>
          <Button
            onClick={() => setActive(1)}
            sx={{
              mr: 2,
              ...styleCard,
              ...(active === 1 && {
                background: "#EAEAEA",
                color: "#8C8B90",
                border: "0px",
                p: "15px",
              }),
            }}
            fullWidth
          >
            <Ethereum style={{ marginRight: "10px" }} />
            Ethereum
          </Button>
          <Button
            onClick={() => setActive(2)}
            sx={{
              ...styleCard,
              ...(active === 2 && {
                background: "#CFDDD9",
                color: "#034D36",
                border: "0px",
                p: "20px",
              }),
            }}
            fullWidth
          >
            <Usdt style={{ marginRight: "10px" }} />
            USDT
          </Button>
        </Box>
      )}

      {active === 0 && <WalletUI bg={orangeBg} />}
      {active === 1 && <WalletUI bg={greyBg} color='#fff' />}
      {active === 2 && <WalletUI bg={greenBg} />}
    </div>
  );
}
