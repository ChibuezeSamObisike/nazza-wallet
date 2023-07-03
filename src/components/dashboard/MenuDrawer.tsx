import React from "react";
import { Drawer, Box, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const menuLink = [
  {
    label: "Home",
    path: "/",
    icon: HomeRoundedIcon,
  },
  {
    label: "Transactions",
    path: "/all-transactions",
    icon: AccountBalanceWalletRoundedIcon,
  },
  {
    label: "Account",
    path: "/referrals",
    icon: PersonAddIcon,
  },
];

interface IMenuProps {
  open: boolean;
  close: Function;
}

function MenuItem({
  icon: Icon,
  label,
  path,
  onClick,
}: {
  icon: typeof SettingsIcon;
  label: string;
  path: string;
  onClick: any;
}) {
  return (
    <NavLink onClick={onClick} to={path}>
      {({ isActive }) => (
        <Box
          p={2}
          color={isActive ? "#001D4B" : "#47454C"}
          mt={2}
          display="flex"
          alignItems="center"
          sx={{
            bgcolor: isActive ? "#EFF3FF" : "#fff",
            p: 3,
          }}
        >
          <Icon
            sx={{
              borderRadius: "40px",
            }}
          />
          <Typography ml={2}>{label}</Typography>
        </Box>
      )}
    </NavLink>
  );
}

export default function MenuDrawer({ open, close }: IMenuProps) {
  return (
    <div
      style={{
        zIndex: 1,
      }}
    >
      <React.Fragment>
        <Box width="100%">
          <Drawer
            open={open}
            sx={{
              zIndex: 1,
            }}
            onClose={() => close()}
          >
            <Box width="70vw" px={2} mt={15}>
              {menuLink.map((x, i) => (
                <MenuItem key={i} {...x} onClick={() => close()} />
              ))}
            </Box>
          </Drawer>
        </Box>
      </React.Fragment>
    </div>
  );
}
