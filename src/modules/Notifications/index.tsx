import React from "react";

import { Box, Divider, Typography, LinearProgress } from "@mui/material";
import AppBreadCrumb from "shared/AppBreadCrumb";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";

import { ReactComponent as NotificationIcon } from "assets/NotificationItem.svg";

import { pxToRem } from "utils/pxToRem";

import { useQuery } from "react-query";
import { getNotifications } from "services/authLogin";

import moment from "moment";

export default function Index() {
  const { data, isLoading } = useQuery("notifications", getNotifications, {
    onSuccess(data) {
      console.log("Notif", data);
    },
  });

  const dateToDateConverter = (date: any): any => {
    let dateFx = moment(new Date(date)).format("Do    MMMM    YYYY");

    return dateFx;
  };

  const getTime = (date: any) => {
    return moment(new Date(date)).format("h:mm a");
  };

  return (
    <Box>
      <AppBreadCrumb
        links={[{ title: "Home", link: "/" }]}
        current='Notification'
      />

      {isLoading && (
        <Box sx={{ width: "100%", mt: 5 }}>
          <LinearProgress />
        </Box>
      )}

      <Box>
        {data?.map((x: any) => (
          <Box bgcolor='#fff' mt={3} py={{ xs: 2, md: 2 }}>
            <Box p={{ xs: 3, md: 6 }}>
              <Box>
                <Box display='flex'>
                  <NotificationIcon />
                  <Typography
                    fontSize={pxToRem(18)}
                    ml={2}
                    fontWeight={700}
                    mb={3}
                  >
                    {x?.message}
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  flexDirection={{ xs: "column", md: "row" }}
                >
                  <Typography variant='body1' fontWeight={400}>
                    We have recieved your payment and required amount have been
                    sent to your account.
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
                    <Typography ml={1}>{getTime(x?.updateAt)}</Typography>
                    <Typography mx={2}>|</Typography>
                    <Typography ml={1}>
                      {dateToDateConverter(x.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
