import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  Button,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import { ReactComponent as Bitcoin } from "assets/Bitcoin.svg";
import SwapVerticalCircleOutlinedIcon from "@mui/icons-material/SwapVerticalCircleOutlined";
import SellSmallScreen from "shared/layout/SellSmallScreen";

export default function SellModal({
  open,
  close,
  openNext,
}: {
  open?: boolean;
  close?: VoidFunction;
  openNext?: VoidFunction;
}) {
  const [toggleCurr, setToggleCurr] = useState("NGN");
  const toggleCurrency = (): void => {
    if (toggleCurr === "NGN") {
      setToggleCurr("USD");
    } else {
      setToggleCurr("NGN");
    }
  };

  const getAltCurrency = (): string => {
    if (toggleCurr === "NGN") {
      return "USD";
    } else {
      return "NGN";
    }
  };
  return (
    <Box>
      <SellSmallScreen
        title='Choose amount'
        subtitle='Enter the amount you want to sell '
      >
        <Box
          color='#5D5C63'
          textAlign='center'
          bgcolor='#fff'
          p={{ md: 4, xs: 2 }}
          borderRadius='16px'
          border='1px solid #A4A3A7'
        >
          <Typography
            fontSize={pxToRem(52)}
            pt={3}
            mb={2}
            fontWeight='bold'
            sx={{
              position: "relative",
            }}
          >
            <input placeholder='0' />
            <span
              style={{
                fontSize: pxToRem(18),
                fontWeight: 500,
                position: "absolute",
                bottom: "0",
                right: "140px",
              }}
            >
              USD
            </span>
          </Typography>

          <Box
            display='flex'
            justifyContent='flex-end'
            mt={-10}
            mb={10}
            mr={{ md: 5, xs: 0 }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-around'
            >
              <IconButton onClick={() => toggleCurrency()}>
                <SwapVerticalCircleOutlinedIcon
                  sx={{
                    fontSize: pxToRem(33),
                    color: "#D4D4D4",
                  }}
                />
              </IconButton>
              <Box>
                <Typography fontSize={pxToRem(16)}>{toggleCurr}</Typography>
                <Typography fontSize={pxToRem(12)} color='#D4D4D4'>
                  {getAltCurrency()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography>1 BTC ~ N1</Typography>

          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            border='1px solid #A4A3A7'
            p={1}
            borderRadius={"4px"}
            mt={2}
          >
            <Typography color='#8C8B90' fontWeight={300}>
              Select coin you want to sell
            </Typography>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              //   value={age}
              label='Age'
              //   onChange={handleChange}
              placeholder='Hello Woerld'
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
              {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
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
    </Box>
  );
}
