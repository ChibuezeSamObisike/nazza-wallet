import React from "react";
import {
  Drawer,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import logo from "assets/Nazza-logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { pxToRem } from "utils/pxToRem";

interface IMenuProps {
  open: boolean;
  close: Function;
}

const NavClick = ({
  path,
  close,
  label,
}: {
  path: string;
  close: Function;
  label: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(path);
        close();
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <Typography
        style={{
          padding: pxToRem(10),
          color: "white",
          fontWeight: "light",
          fontSize: pxToRem(20),
        }}
      >
        {label}
      </Typography>
    </div>
  );
};

export default function MenuDrawer({ open, close }: IMenuProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Drawer open={open} onClose={() => close()}>
      <Box width='100vw' sx={{}} color='#fff'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          p={3}
          bgcolor='#2574F5'
        >
          <img
            src={logo}
            alt='logo'
            width={isSmallScreen ? 100 : 129}
            style={{
              cursor: "pointer",
            }}
          />

          <IconButton onClick={() => close()}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Box height='90vh' bgcolor='#001D4B'>
          <Box
            display='flex'
            alignItems='flex-start'
            flexDirection='column'
            justifyContent='space-around'
            p={5}
          >
            {[
              { label: "Dashboard", close: () => close(), path: "/" },
              { label: "Sell", close: () => close(), path: "/sell" },
              { label: "Referral", close: () => close(), path: "/referrals" },
            ].map((x) => (
              <NavClick {...x} />
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
