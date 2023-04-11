import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Button,
  Theme,
} from "@mui/material";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useQuery, useMutation } from "react-query";
import { FieldValues, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import AppBreadCrumb from "shared/AppBreadCrumb";

import { useAlert } from "hooks/useAlert";

import {
  changeName,
  getProfileDetails,
  updateProfile,
} from "services/AppService";

import { handleAppError } from "utils/handleApiError";

export default function ProfileDetails() {
  const [showName, setShowName] = useState<boolean>(false);

  const { showNotification } = useAlert();

  const { data, isLoading } = useQuery("fetchUserDetails", getProfileDetails, {
    onSuccess(data) {
      console.log("Profile Data", data);
    },
  });

  const { mutate, isLoading: isMutateChangeNameLoading } = useMutation(
    changeName,
    {
      onSuccess(data) {
        showNotification?.("Success", { type: "success" });
      },
      onError(err) {
        showNotification?.(handleAppError(err), {
          type: "error",
        });
      },
    }
  );

  const defaultValues = {
    name: "",
    lastname: "",
  };

  const schema = Yup.object({
    name: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
  });

  const resolver = yupResolver(schema);

  const {
    register,
    handleSubmit: handleChangeName,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver, defaultValues });

  const onSubmit = (data: FieldValues) => {
    console.log("field values", getValues());
    mutate({ data });
  };

  const { mutate: mutateProfile, isLoading: isProfileLoading } = useMutation(
    updateProfile,
    {
      onSuccess(data) {
        showNotification?.("Success", { type: "success" });
      },
      onError(err) {
        showNotification?.(handleAppError(err), {
          type: "error",
        });
      },
    }
  );

  const defaultValue = {
    username: "",
    phone: "",
  };

  const onProfileSubmit = (data: FieldValues) => {
    mutateProfile({ data });
  };

  const { register: registerProfile, handleSubmit: handleProfileUpdate } =
    useForm({ defaultValues: defaultValue });

  useEffect(() => {
    setValue("name", `${data?.name ?? "--"}`);
    setValue("lastname", `${data?.lastname ?? "--"}`);
  }, []);

  if (showName) {
    return (
      <form onSubmit={handleChangeName(onSubmit)}>
        <Box bgcolor='#fff' p={3} pt={5} mt={2} border='1px solid #EBEBEB'>
          <Box display='flex' alignItems='center'>
            <IconButton onClick={() => setShowName(false)}>
              <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography fontWeight='bold' variant='body1' ml={2}>
              Edit Name
            </Typography>
          </Box>
          <Divider
            sx={{
              my: 2,
            }}
          />
          <Alert severity='warning'>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Please note:
            </span>{" "}
            If you change your name on Nazza, you can't change it again for 28
            days.
          </Alert>

          <TextField
            id='outlined-required'
            label='First Name'
            {...register("name")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            error={Boolean(errors["name"]?.message)}
            helperText={errors.name?.message?.toString()}
          />

          <TextField
            id='outlined-required'
            label='Last Name'
            {...register("lastname")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            error={Boolean(errors["lastname"]?.message)}
            helperText={errors.lastname?.message?.toString()}
          />

          <Button
            fullWidth
            sx={{
              my: 2,
            }}
            type='submit'
            startIcon={
              isMutateChangeNameLoading && (
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
            Change name
          </Button>
        </Box>
      </form>
    );
  }
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        open={!!isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <AppBreadCrumb links={[{ title: "Home", link: "/" }]} current='Profile' />
      <Box bgcolor='#fff' p={3} pt={5} mt={2} border='1px solid #EBEBEB'>
        <Box>
          <Typography mb={2} variant='body1' fontWeight='bold'>
            Personal Details
          </Typography>
          <Divider />
        </Box>
        <form onSubmit={handleProfileUpdate(onProfileSubmit)}>
          <Box width={{ xs: "100%", md: "60%" }}>
            <TextField
              id='outlined-required'
              label='Name'
              disabled
              value={`${data?.name} ${data?.lastname}`}
              {...registerProfile("username")}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <Box>
                      <IconButton
                        disableFocusRipple
                        disableRipple
                        onClick={() => setShowName(true)}
                      >
                        <BorderColorOutlinedIcon color='primary' />
                        <Typography ml={2} color='primary'>
                          Edit
                        </Typography>
                      </IconButton>
                    </Box>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                marginTop: "30px",
              }}
              placeholder='Name'
            />
            <TextField
              id='outlined-required'
              label='Email'
              disabled
              value={data?.email}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{
                marginTop: "30px",
              }}
              placeholder='Ogbonnasamuel67@gmail.com'
            />

            <TextField
              id='input-with-icon-textfield'
              label='Phone Number'
              value={data?.phone}
              {...registerProfile("phone")}
              fullWidth
              sx={{
                marginTop: "30px",
              }}
              placeholder='000000'
            />
            <Alert
              sx={{
                mt: 2,
                fontWeight: "bold",
              }}
              severity='info'
            >
              We recommend you use your WhatsApp number
            </Alert>

            <Button
              fullWidth
              sx={{ my: 3 }}
              type='submit'
              startIcon={
                isProfileLoading && (
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
              Save
            </Button>
          </Box>
        </form>
      </Box>
      {/* <Box bgcolor='#fff' p={3} pt={5} mb={3} mt={3} border='1px solid #EBEBEB'>
        <Typography fontWeight='bold'>Bank destination account</Typography>

        <Divider sx={{ my: 2 }} />

        <Box my={3}>
          <Box
            bgcolor='#E9F1FF'
            p={2}
            px={4}
            mb={4}
            mt={3}
            display='flex'
            color='#001D4B'
            alignItems='center'
            border='1px solid #E9F1FF'
            flexDirection={{ md: "row", xs: "column" }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography fontWeight='bold'>Ologwu Samuel</Typography>
            </Box>
            <Typography
              ml={6}
              variant='body2'
              fontWeight={400}
              display='flex'
              alignItems='center'
            >
              12********85 <Typography mx={3}> |</Typography> First Bank
            </Typography>
            <IconButton>
              <DeleteIcon
                sx={{
                  color: "#D53A32",
                  ml: { md: 3, xs: 0 },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box> */}
    </>
  );
}
