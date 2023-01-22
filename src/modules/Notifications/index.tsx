import React from "react";

import { Box, Divider, Typography } from "@mui/material";
import AppBreadCrumb from "shared/AppBreadCrumb";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";

import { pxToRem } from "utils/pxToRem";

export default function index() {
  return (
    <Box>
      <AppBreadCrumb
        links={[{ title: "Home", link: "/" }]}
        current='Notification'
      />

      <Box>
        <Box bgcolor='#fff' mt={3} py={8}>
          <Box p={6}>
            <Typography fontSize={pxToRem(18)} fontWeight={700} mb={3}>
              Payment Received
            </Typography>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              flexDirection={{ xs: "column", md: "row" }}
            >
              <Typography variant='body1' fontWeight={400}>
                We have recieved your payment and required amount have been sent
                to your account.
              </Typography>

              <Box
                display='flex'
                alignItems={{ xs: "left", md: "center" }}
                justifyContent={{ xs: "flex-start", md: "space-between" }}
                color='#A4A3A7'
                mt={{
                  xs: 3,
                  md: "auto",
                }}
                fontWeight={400}
                // bgcolor='red'
                width={{ xs: "100%", md: "auto" }}
              >
                <QueryBuilderOutlinedIcon
                  sx={{
                    color: "#A4A3A7",
                  }}
                />
                <Typography ml={1}>7 :59 Pm</Typography>
                <Typography mx={2}>|</Typography>
                <Typography ml={1}>12th June, 2023</Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
}
