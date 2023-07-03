import React from "react";
import { Box, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import GradingIcon from "@mui/icons-material/Grading";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TelegramIcon from "@mui/icons-material/Telegram";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { NavLink, useNavigate } from "react-router-dom";
import { logOutFromAdmin } from "utils/auth";

export default function AdminLayout({ children }: { children: any }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <Box
        width="24%"
        sx={{
          display: { xs: "none", md: "block" },
        }}
        pt={10}
        height="100vh"
        bgcolor="#fff"
      >
        <SideBar />
      </Box>
      <Box width="100%" p="40px">
        {children}
      </Box>
    </Box>
  );
}

const SideBar = () => {
  const navigate = useNavigate();
  const sidebar = [
    {
      title: "Dashboard",
      component: HomeIcon,
      path: "/admin",
    },
    {
      title: "wallet",
      component: GradingIcon,
      path: "/admin/wallet",
    },
    {
      title: "Orders",
      component: GradingIcon,
      path: "/admin/orders",
    },
    {
      title: "Customers",
      component: PeopleAltIcon,
      path: "/admin/customers",
    },
    {
      title: "Payout History",
      component: TelegramIcon,
      path: "/admin/payout-history",
    },
    // {
    //   title: "Referral Programme",
    //   component: TelegramIcon,
    //   path: "/referral-programme",
    // },
    {
      title: "Settings",
      component: SettingsIcon,
      path: "/admin/settings",
    },
  ];
  return (
    <>
      <Box
        p="20px"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Box position="fixed" pt={50}>
          {sidebar.map(({ component: Component, title, path }) => (
            <NavLink to={path} style={{ width: "100%" }}>
              {({ isActive }) => (
                <Box
                  display="flex"
                  alignItems="center"
                  color="#101628"
                  my={2}
                  py={2}
                  pl={1}
                  sx={{
                    width: "100%",
                  }}
                  borderLeft={isActive ? "4px solid #101628" : ""}
                  bgcolor={isActive ? "#E9F1FF" : ""}
                >
                  <Component />
                  <Typography ml={2}>{title}</Typography>
                </Box>
              )}
            </NavLink>
          ))}
          <Box
            my={2}
            py={2}
            pl={1}
            display="flex"
            alignItems="center"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              logOutFromAdmin();
              navigate("/admin");
            }}
          >
            <LogoutOutlinedIcon />
            <Typography ml={2}>Logout</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
