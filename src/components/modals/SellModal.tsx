import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

import GenericModal from "./GenericModal";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { useQuery, useMutation } from "react-query";

import {
  getCoinRates,
  getBanks,
  getBankAcctName,
  getBankList,
  addBankFunc,
} from "services/AppService";

import SellSmallScreen from "shared/layout/SellSmallScreen";
import getIcon from "utils/getIcon";

import { useAlert } from "hooks/useAlert";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { handleAppError } from "utils/handleApiError";
import { useSell } from "modules/Sell";

import * as Yup from "yup";
import { pxToRem } from "utils/pxToRem";
import { coverSomeNums } from "utils/convertNums";

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
    onSuccess(data) {
      console.log("Data", data);
    },
    onError(err) {
      console.log("Error", err);
    },
  });

  const { sellVal, setSellVal, setViewData, viewData } = useSell();

  const [coindData, setCoinData] = useState<any>();
  const [openBank, setOpen] = useState(false);
  const [coin, setCoin] = useState("USD");

  const { data: dataBank } = useQuery("fetchBanks", getBanks, {
    enabled: true,
    onSuccess(data) {
      console.log("Bank Data", data);
    },
  });

  const [openM1, setOpenM1] = useState(false);
  const [openM2, setOpenM2] = useState(false);
  const [accountName, setAccountName] = useState("");

  const [checked, setChecked] = useState<boolean>();
  const [bankID, setBankID] = useState("");

  const schema = Yup.object({
    bank_code: Yup.string().required("Bank code is Required"),
    acc_number: Yup.string().required("Account number is Required"),
  });

  const resolver = yupResolver(schema);

  const {
    setValue,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      bank_code: "",
      acc_number: "",
    },
    resolver,
  });

  const closeM1 = () => {
    reset();
    setOpenM1(false);
  };
  const closeM2 = () => {
    setOpenM2(false);
  };

  const { showNotification } = useAlert();

  const { data: dataBankList, isLoading } = useQuery("fetchBanks", getBanks, {
    enabled: true,
    onSuccess(data) {
      console.log("Bank Data", data);
    },
  });

  const { data: listOfBanks, isLoading: isBankListLoading } = useQuery(
    "fetchBankList",
    getBankList,
    {
      enabled: true,
      onSuccess(data) {
        console.log("Bank list", data);
      },
    }
  );

  const onSubmit = (data: FieldValues) => {
    addBank.mutate({ data });
  };

  const addBank = useMutation(getBankAcctName, {
    onSuccess(data) {
      setAccountName(data?.account_name);
    },
    onError(err) {
      showNotification?.(handleAppError(err), {
        type: "error",
      });
    },
  });

  const addBankMutate = useMutation(addBankFunc, {
    onSuccess(data) {
      showNotification?.("Success", { type: "success" });
      console.log("Bank data successful", data);
    },
    onError(err) {
      showNotification?.(handleAppError(err), {
        type: "error",
      });
    },
  });

  useEffect(() => {
    setSellVal({
      ...sellVal,
      coin_id: coindData?.target?.value?._id.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coindData]);

  return (
    <>
      <GenericModal open={openM1} close={closeM1}>
        <Box
          textAlign='center'
          alignItems='center'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box
            bgcolor='#E9F1FF'
            height='53px'
            width='53px'
            borderRadius='50%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <AccountBalanceIcon sx={{ color: "#001D4B", fontSize: "32px" }} />
          </Box>
          <Typography my={2} fontWeight='bold'>
            Add a bank Account
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
            }}
          >
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={listOfBanks}
              fullWidth
              loading={isBankListLoading}
              {...register("bank_code")}
              getOptionLabel={(option: { name: string }) => option?.name}
              onChange={(event, item: any) => {
                setValue("bank_code", item["code"]);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    helperText={errors?.["bank_code"]?.message?.toString()}
                    {...params}
                    label='Banks'
                  />
                );
              }}
            />
            <TextField
              fullWidth
              type='number'
              {...register("acc_number")}
              label='Account Number'
              sx={{
                my: 2,
              }}
              helperText={errors?.acc_number?.message?.toString()}
            />

            {accountName && (
              <TextField
                label='Account Name'
                sx={{
                  mb: 4,
                }}
                fullWidth
                disabled
                value={accountName}
              />
            )}

            {accountName === "" && (
              <Button
                type='submit'
                fullWidth
                startIcon={
                  addBank.isLoading && (
                    <CircularProgress
                      size={16}
                      sx={{
                        fontSize: 2,
                        color: "#fff",
                      }}
                    />
                  )
                }
              >
                Confirm
              </Button>
            )}
          </form>

          {accountName !== "" && (
            <Button
              onClick={() => {
                console.log(
                  "Bank details",
                  listOfBanks?.find(
                    (x: any) => x.code === getValues().bank_code
                  )?.name
                );
                addBankMutate.mutate({
                  bank_name: listOfBanks?.find(
                    (x: any) => x.code === getValues().bank_code
                  )?.name,
                  acc_name: accountName,
                  acc_number: getValues()?.acc_number,
                });
              }}
              fullWidth
              startIcon={
                addBankMutate.isLoading && (
                  <CircularProgress
                    size={16}
                    sx={{
                      fontSize: 2,
                      color: "#fff",
                    }}
                  />
                )
              }
            >
              Submit Details
            </Button>
          )}
        </Box>
      </GenericModal>
      <Box>
        <SellSmallScreen title='' subtitle=''>
          <Box
            color='#5D5C63'
            textAlign='center'
            bgcolor='#fff'
            p={{ md: 4, xs: 2 }}
            borderRadius='16px'
            border='1px solid #A4A3A7'
          >
            <Box>
              <Typography
                textAlign='left'
                fontWeight='bold'
                fontSize={pxToRem(24)}
              >
                Select coin
              </Typography>
            </Box>
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
                  console.log("Coin data change", x.target.value);
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
                {`${coindData?.target.value.name.toUpperCase()}`} RATE ~{" "}
                {`${coindData?.target.value.rate}  NAIRA / DOLLAR`}
              </Typography>
            )}

            <Box
              sx={{ mt: 3 }}
              display='flex'
              alignItems='center'
              justifyContent='space-around'
            >
              {!openBank && (
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  p={3}
                  borderRadius={1}
                  border='1px solid #A4A3A7'
                  onClick={() => setOpen(true)}
                  sx={{ width: "100%" }}
                >
                  <Typography>Select bank account</Typography>
                  <KeyboardArrowDownIcon />
                </Box>
              )}
              {openBank && (
                <Box
                  width='100%'
                  bgcolor='#FAFBFF'
                  p={3}
                  border='1px solid #E9F1FF'
                  sx={{
                    borderRadius: 1,
                  }}
                >
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    onClick={() => setOpen(false)}
                  >
                    <Typography fontSize={"14px"}>
                      Select bank account
                    </Typography>
                    <KeyboardArrowDownIcon />
                  </Box>
                  {dataBank?.map((x: any) => (
                    <Box
                      bgcolor='#E9F1FF'
                      p={2}
                      px={4}
                      mb={4}
                      mt={3}
                      display='flex'
                      color='#001D4B'
                      alignItems={{ xs: "left", md: "center" }}
                      border='1px solid #E9F1FF'
                      flexDirection={{ md: "row", xs: "column" }}
                    >
                      <Checkbox
                        sx={{}}
                        onChange={(e) => {
                          // setBankID(x?._id);
                          // setBankID("");
                          // setChecked(!checked);
                        }}
                      />
                      <Box>
                        <Typography fontWeight='bold' fontSize={18}>
                          {x?.acc_name}
                        </Typography>

                        <Typography
                          ml={6}
                          variant='body2'
                          fontWeight={400}
                          display='flex'
                          alignItems='center'
                        >
                          {coverSomeNums?.(x?.acc_number?.toString())}{" "}
                          <Typography mx={3}> |</Typography> {x?.bank_name}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  {dataBank?.length === 0 && (
                    <Box display='flex' alignItems='center' mt={3}>
                      <Typography>No banks added</Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            <Box
              color='#001D4B'
              onClick={() => setOpenM1(true)}
              component={Button}
              fullWidth
              bgcolor='#E9F1FF'
              mt={2}
              mb={4}
              sx={{
                p: 2,
              }}
            >
              <Typography variant='body1' fontWeight='bold'>
                + Add payment destination
              </Typography>
            </Box>

            <Button
              sx={{
                mt: 3,
              }}
              // disabled={!(sellVal.amount && viewData.coinValue)}
              fullWidth
              onClick={() => openNext?.()}
            >
              Proceed to next step
            </Button>
          </Box>
        </SellSmallScreen>
      </Box>
    </>
  );
}
