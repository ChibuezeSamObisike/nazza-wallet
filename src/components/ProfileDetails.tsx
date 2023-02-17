import React, { useState } from "react";
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
} from "@mui/material";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useQuery } from "react-query";

import AppBreadCrumb from "shared/AppBreadCrumb";
import { getProfileDetails } from "services/authLogin";

export default function ProfileDetails() {
  const [value, setValue] = React.useState<any | null>(null);

  const [showName, setShowName] = useState<boolean>(false);

  const { data, isLoading } = useQuery("fetchUserDetails", getProfileDetails, {
    onSuccess(data) {
      console.log("Profile Data", data);
    },
  });

  const handleChange = (newValue: any | null) => {
    setValue(newValue);
  };
  if (showName) {
    return (
      <>
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
            disabled
            value={data?.name}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='Moses'
          />

          <TextField
            id='outlined-required'
            label='Last Name'
            disabled
            value={data?.lastname}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: "30px",
            }}
            placeholder='Moses'
          />

          <Button
            fullWidth
            sx={{
              my: 2,
            }}
          >
            Change name
          </Button>
        </Box>
      </>
    );
  }
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
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
        <Box width={{ xs: "100%", md: "60%" }}>
          <TextField
            id='outlined-required'
            label='Name'
            value={data?.name}
            fullWidth
            disabled
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
            placeholder='Olugwu Samuel'
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

          <DesktopDatePicker
            label='Date'
            inputFormat='MM/DD/YYYY'
            value={value}
            onChange={handleChange}
            renderInput={(params: any) => (
              <TextField
                fullWidth
                sx={{
                  backgroundColor: "#E9F1FF",
                  color: "#000000",
                  fontWeight: 500,
                  bgcolor: "#fff",
                  marginTop: "30px",
                }}
                {...params}
              />
            )}
          />
        </Box>
      </Box>
      <Box bgcolor='#fff' p={3} pt={5} mb={3} mt={3} border='1px solid #EBEBEB'>
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
      </Box>
    </>
  );
}
