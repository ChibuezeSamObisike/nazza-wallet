import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  Button,
  MenuItem,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import { useQuery } from "react-query";
import { getCoinRates } from "services/AppService";
import { useSell } from "modules/Sell";

import SellSmallScreen from "shared/layout/SellSmallScreen";
import getIcon from "utils/getIcon";

export default function SellModal({
  open,
  close,
  openNext,
}: {
  open?: boolean;
  close?: VoidFunction;
  openNext?: VoidFunction;
}) {
  const { data } = useQuery("getCoinRatess", getCoinRates, {
    enabled: true,
    onSuccess(data) {},
    onError(err) {},
  });

  const { sellVal, setSellVal, setViewData, viewData } = useSell();

  const [coindData, setCoinData] = useState<any>();
  const [coin, setCoin] = useState("");

  useEffect(() => {
    setSellVal({
      ...sellVal,
      coin_id: coindData?.target?.value?._id.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coindData]);

  useEffect(() => {
    setCoin("USD");
    setViewData({ ...viewData, currency: "USD" });
  }, []);

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
              Select coin to sell
            </Typography>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              label='Age'
              placeholder='Hello Woerld'
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "0px solid #484850",
                  borderRadius: "0px",
                },
              }}
              onChange={(x: any) => {
                setCoinData(x);
                setViewData({
                  ...viewData,
                  coinValue: x?.target?.value.rate,
                  coinName: x?.target?.value.name.toUpperCase(),
                });
              }}
            >
              {data?.data?.map((x: any) => {
                return (
                  <MenuItem value={x}>
                    <Box
                      display='flex'
                      justifyContent={"space-between"}
                      alignItems='center'
                    >
                      <img
                        src={getIcon(x?.name.toString().toUpperCase())}
                        alt=''
                      />
                      <Typography ml={2}>
                        {x?.name.toString().toUpperCase()}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          {coindData?.target.value.rate && (
            <Typography
              sx={{
                marginY: "20px",
              }}
              textAlign='left'
            >
              {`${coindData?.target.value.name.toUpperCase()} RATE`} ~{" "}
              {`${coindData?.target.value.rate}  ₦/$`}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <OutlinedInput
                fullWidth
                type='number'
                placeholder='How much'
                sx={{
                  ".Mui-Focused": {
                    outline: "none",
                    border: "1px solid red",
                  },
                }}
                onChange={(e) =>
                  setSellVal({ ...sellVal, amount: e.target.value })
                }
                startAdornment={
                  <InputAdornment position='start'>
                    {coin === "USD" ? "$" : "₦"}
                  </InputAdornment>
                }
              />
              <Select
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "0px solid #484850",
                    borderRadius: "0px",
                  },
                }}
                onChange={(x: any) => {
                  setCoin(x.target?.value);

                  setViewData({ ...viewData, currency: x?.target?.value });
                }}
                defaultValue={"USD"}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"NGN"}>NGN</MenuItem>
              </Select>
            </Box>
          </Box>

          <Button
            sx={{
              mt: 3,
            }}
            disabled={!sellVal.amount}
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
