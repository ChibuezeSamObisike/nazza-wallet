import React from "react";
import AppModal from "components/AppModal";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Select,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import { ReactComponent as Bitcoin } from "assets/Bitcoin.svg";
import SwapVerticalCircleOutlinedIcon from "@mui/icons-material/SwapVerticalCircleOutlined";

export default function SellModal({
  open,
  close,
}: {
  open: boolean;
  close: VoidFunction;
}) {
  return (
    <AppModal open={open} sxStyle={{ textAlign: "center" }} close={close}>
      <Box color='#5D5C63'>
        <Typography
          fontWeight={"bold"}
          variant='subtitle1'
          fontSize={pxToRem(28)}
        >
          How much do you want to sell?
        </Typography>

        <Typography fontSize={pxToRem(52)} pt={4} mb={2} fontWeight='bold'>
          0{" "}
          <span
            style={{
              fontSize: pxToRem(18),
              fontWeight: 500,
            }}
          >
            USD
          </span>
        </Typography>

        <Box display='flex' justifyContent='flex-end' mt={-10} mb={10} mr={5}>
          <Box display='flex' alignItems='center' justifyContent='space-around'>
            <IconButton>
              <SwapVerticalCircleOutlinedIcon
                sx={{
                  fontSize: pxToRem(33),
                  color: "#D4D4D4",
                }}
              />
            </IconButton>
            <Box>
              <Typography fontSize={pxToRem(16)}>USD</Typography>
              <Typography fontSize={pxToRem(12)} color='#D4D4D4'>
                NGN
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography>1 BTC ~ N1</Typography>

        <TextField
          placeholder='Select coin you want to sell'
          sx={{
            width: "100%",
            mt: 3,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
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
              </InputAdornment>
            ),
          }}
        />

        <Box textAlign='left'>
          <Typography mt={2}>
            Rate: USD
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              0
            </span>
          </Typography>
          <Typography mt={2}>
            Balance: USD
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              0
            </span>
          </Typography>

          <Typography color='#D53A32' mt={2}>
            Balance insufficient:
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              Deposit/Receive
            </span>
          </Typography>
        </Box>

        <Button
          sx={{
            mt: 3,
          }}
          disabled={false}
          fullWidth
        >
          Review and Confirm
        </Button>
      </Box>
    </AppModal>
  );
}
