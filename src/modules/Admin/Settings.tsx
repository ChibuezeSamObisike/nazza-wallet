import React from "react";
import AdminLayout from "./Components/AdminLayout";
import {
  Typography,
  Box,
  Divider,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import AppBreadCrumb from "shared/AppBreadCrumb";

export default function Settings() {
  return (
    <div>
      <AdminLayout>
        <Box mb={5}>
          <AppBreadCrumb
            links={[{ title: "Settings", link: "/" }]}
            current='Profile'
          />
        </Box>
        <Box display='flex' alignItems='center'>
          <Typography>Profile</Typography>
          <Typography
            sx={{
              opacity: "0.5",
              cursor: "pointer",
            }}
            mx={3}
          >
            Security
          </Typography>
          <Typography
            sx={{
              opacity: "0.5",
              cursor: "pointer",
            }}
            mx={3}
          >
            Admin
          </Typography>
        </Box>

        <Box bgcolor='white' border='1px solid grey.500' mt={5} width='70%'>
          <Typography p={3} fontWeight='bold'>
            Admin Details
          </Typography>
          <Divider sx={{ mb: 2, width: "95%", mx: "auto" }} />
          <Box display='flex' p={3} justifyContent='space-between'>
            <Box width='30%' textAlign='center'>
              <Box
                width='100px'
                height='100px'
                borderRadius='50%'
                mx='auto'
                display='flex'
                alignItems='center'
                justifyContent='center'
                bgcolor='grey.500'
                mb={2}
              >
                <Typography
                  fontWeight='bold'
                  color='white'
                  fontSize={pxToRem(36)}
                >
                  OS
                </Typography>
              </Box>
              <Typography fontWeight='bold'>Ologwu Samuel</Typography>
              <Typography fontWeight={200}>olugwusamuel@gmail.com</Typography>
            </Box>
            <Box width='60%'>
              <TextField
                label='Email'
                sx={{
                  my: 2,
                }}
                fullWidth
                value='samwene@gmail.com'
              />
              <TextField
                label='Name'
                sx={{
                  my: 2,
                }}
                fullWidth
                value='Chibueze Sam'
              />
              <TextField
                label='Phone'
                sx={{
                  my: 2,
                }}
                fullWidth
                value='090138549328'
              />
              <Alert severity='success' sx={{ mb: 2 }}>
                We recommend you use your Whatsapp number
              </Alert>

              <Button sx={{ width: "100%" }}>Save</Button>
            </Box>
          </Box>
        </Box>
      </AdminLayout>
    </div>
  );
}
