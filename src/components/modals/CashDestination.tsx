import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Autocomplete,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SellSmallScreen from "shared/layout/SellSmallScreen";
import GenericModal from "./GenericModal";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useQuery, useMutation } from "react-query";
import {
  getBankList,
  addBankFunc,
  getBanks,
  getBankAcctName,
} from "services/AppService";

import { useAlert } from "hooks/useAlert";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { handleAppError } from "utils/handleApiError";
import { useSell } from "modules/Sell";

import * as Yup from "yup";
import { coverSomeNums } from "utils/convertNums";

export default function CashDestination({
  open,
  close,
  openNext,
  back,
}: {
  open?: boolean;
  close?: VoidFunction;
  openNext?: VoidFunction;
  back?: VoidFunction;
}) {
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

  const { sellVal, viewData } = useSell();

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

  const { data, isLoading } = useQuery("fetchBanks", getBanks, {
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
      showNotification?.("Success", { type: "success" });
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

      <GenericModal open={openM2} close={closeM2}>
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
          <Typography fontSize={pxToRem(18)} my={2} fontWeight='bold'>
            You added a new bank account
          </Typography>

          <Typography color='#8C8B90' fontWeight={300} mb={2}>
            You can now recieve funds to this bank accounts
          </Typography>

          <Button onClick={() => closeM2()} fullWidth>
            Done
          </Button>
        </Box>
      </GenericModal>
      <SellSmallScreen title='Account' subtitle='Select your cash destination'>
        <Box
          color='#5D5C63'
          textAlign='center'
          bgcolor='#fff'
          p={{ md: 4, xs: 2 }}
          borderRadius='16px'
          border='1px solid #A4A3A7'
        >
          <Box mb={2} width='100%' display='flex'>
            <IconButton onClick={back}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography
            fontSize={pxToRem(52)}
            mb={2}
            fontWeight='bold'
            sx={{
              position: "relative",
            }}
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
              <input
                placeholder='0'
                className='input'
                disabled
                style={{
                  width: "45%",
                }}
                value={sellVal.amount}
              />
            </Typography>
          </Typography>

          <Typography>
            {viewData?.coinName} RATE ~ N{viewData?.coinValue} NAIRA / DOLLAR
          </Typography>

          {isLoading && (
            <Skeleton
              sx={{
                height: "90px",
              }}
            />
          )}
          {data?.map((x: any) => (
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
                  setBankID("");
                  setChecked(!checked);
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
            disabled={!!isLoading}
            fullWidth
            onClick={() => openNext?.()}
          >
            Proceed to next step
          </Button>
        </Box>
      </SellSmallScreen>
    </>
  );
}
