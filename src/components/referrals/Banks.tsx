import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import GenericModal from "components/modals/GenericModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { AxiosError } from "axios";

import http from "utils/http";
import { handleAppError } from "utils/handleApiError";
import { useAlert } from "hooks/useAlert";

import {
  getBanks,
  getBankList,
  getBankAcctName,
  addBankFunc,
} from "services/AppService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FieldValues, useForm } from "react-hook-form";
import { pxToRem } from "utils/pxToRem";

import deleteGif from "assets/bank-delete.gif";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Banks() {
  const [openM1, setOpenM1] = useState(false);
  const [openM2, setOpenM2] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [accountName, setAccountName] = useState("");

  const queryClient = useQueryClient();
  const { showNotification } = useAlert();

  const { data } = useQuery("fetchBanks", getBanks, {
    enabled: true,
  });

  const { data: listOfBanks, isLoading: isBankListLoading } = useQuery(
    "fetchBankList",
    getBankList,

    {
      enabled: true,
      onSuccess(data) {},
    }
  );

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

  const addBank = useMutation(getBankAcctName, {
    onSuccess(data) {
      setAccountName(data?.account_name);
      // reset();
      // setOpenM1(false);
      // setOpenM2(true);
    },
    onError(err) {
      showNotification?.("Invalid account details" || handleAppError(err), {
        type: "error",
      });
    },
  });

  const addBankMutate = useMutation(addBankFunc, {
    onSuccess(data) {
      queryClient.invalidateQueries("fetchBanks");

      setOpenM1(false);
      setOpenM2(true);
    },
    onError(err) {
      showNotification?.(handleAppError(err) || "Account name does not match", {
        type: "error",
      });
    },
  });

  const deleteBankMute = useMutation(
    (id: string | number) => {
      return http.delete(`user/bank/${id}`);
    },
    {
      onSuccess() {
        showNotification?.("Successfully Deleted Bank", {
          type: "success",
        });
        setIdToDelete("");
        queryClient.invalidateQueries("fetchBanks");
        closeBankModal();
      },
      onError(error: AxiosError) {
        showNotification?.(handleAppError(error), {
          type: "error",
        });
      },
    }
  );

  const onSubmit = (data: FieldValues) => {
    addBank.mutate({ data });
  };

  const closeM1 = (): void => {
    reset();
    setAccountName("");
    setIdToDelete("");
    setOpenM1(false);
  };
  const closeM2 = (): void => {
    setIdToDelete("");
    setOpenM2(false);
  };

  const openDeleteBank = (): void => {
    setOpenBank(true);
  };

  const closeBankModal = (): void => {
    setIdToDelete("");
    setOpenBank(false);
  };

  const coverSomeNums = (num: string): string => {
    let length = num?.length;
    return `${num.split("")[0] + num.split("")[1]}*********${
      num.split("")[length - 2] + num.split("")[length - 1]
    }`;
  };

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
              sx={{
                fontSize: 4,
              }}
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

      <GenericModal open={openBank} close={closeBankModal}>
        <Box textAlign='center'>
          <Box>
            <img src={deleteGif} alt='delete gif' width={200} />
          </Box>
          <Typography fontWeight='bold' fontSize={pxToRem(18)}>
            Are you sure?
          </Typography>
          <Typography mt={3} fontWeight={300} color='#8C8B90'>
            Verify that you really want to delete the <br /> chosen bank
            account.
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{
                my: 3,
              }}
              onClick={() => deleteBankMute.mutate(idToDelete)}
              startIcon={
                deleteBankMute?.isLoading && (
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
              Yes, delete the bank Account
            </Button>
            <Button variant='outlined' onClick={() => closeBankModal()}>
              Cancel
            </Button>
          </div>
        </Box>
      </GenericModal>
      <Box bgcolor='#fff' p={3} pt={5} mb={3} border='1px solid #D4D4D4'>
        <Typography fontWeight='bold'>Banks</Typography>
        <Typography mt={2} fontWeight={300}>
          You can add your bank account where you will deposited
        </Typography>

        <Divider sx={{ my: 2 }} />

        {data && (
          <Box my={3}>
            {data?.map((x: any) => {
              return (
                <Box
                  bgcolor='#FAFBFF'
                  p={2}
                  px={4}
                  mb={4}
                  mt={3}
                  display='flex'
                  color='#001D4B'
                  alignItems='center'
                  border='1px solid #E9F1FF'
                  width={{ md: "60%", xs: "80%" }}
                  flexDirection={{ md: "row", xs: "column" }}
                >
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Typography fontWeight='bold'>{x?.acc_name}</Typography>
                  </Box>
                  <Typography
                    ml={6}
                    variant='body2'
                    fontWeight={400}
                    display='flex'
                    alignItems='center'
                  >
                    {coverSomeNums(x?.acc_number?.toString())}{" "}
                    <Typography mx={3}> |</Typography> {x?.bank_name}
                  </Typography>
                  <IconButton disableRipple disableTouchRipple>
                    <DeleteIcon
                      onClick={() => {
                        setIdToDelete(x?._id);
                        openDeleteBank();
                      }}
                      sx={{
                        color: "#D53A32",
                        ml: { md: 3, xs: 0 },
                      }}
                    />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        )}
        <Button
          sx={{
            width: "100%",
            mt: 5,
            borderRadius: "0px",
          }}
          onClick={() => setOpenM1(true)}
        >
          Add bank account
        </Button>
      </Box>
    </>
  );
}
