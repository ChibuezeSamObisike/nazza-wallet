import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationIcon from "@mui/icons-material/Notifications";
import logo from "assets/Nazza-logo.svg";
import avatar from "assets/avatar.svg";
import { Container } from "@mui/system";
import { ReactComponent as NotificationsIcon } from "assets/Notification.svg";
import { NavLink, useNavigate, Link } from "react-router-dom";
import MenuDrawer from "./dashboard/MenuDrawer";
import AppMenuItem from "./menu/AppMenuItem";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | boolean>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const dropDownElems = [
    { label: "Account", path: "/Referrals" },
    { label: "Help", path: "/" },
    { label: "Sign Out", path: "/logout" },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        zIndex: 10,
      }}
    >
      <MenuDrawer
        open={openModal}
        close={() => {
          setOpenModal(false);
        }}
      />
      <AppBar
        position="sticky"
        sx={{
          marginBottom: "60px",
        }}
        elevation={0}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Box display={{ xs: "flex", md: "none" }}>
              <IconButton
                sx={{
                  color: "#fff",
                }}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
            <img
              src={logo}
              alt="logo"
              width={isSmallScreen ? 100 : 129}
              style={{
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />

            <Box
              display={{ xs: "flex", md: "none" }}
              alignItems="center"
              justifyContent="center"
            >
              <NavLink
                to="/notification"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                  margin: "0px 20px",
                }}
              >
                {true ? <NotificationIcon /> : <NotificationsIcon />}
              </NavLink>
              <img
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  position: "relative",
                }}
                src={avatar}
                onClick={() => setMobileMenuOpen(true)}
                alt="avatar"
                width={isSmallScreen ? 50 : 129}
              />
              {mobileMenuOpen && (
                <ClickAwayListener onClickAway={() => setMobileMenuOpen(false)}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    rowGap={"1rem"}
                    position={"absolute"}
                    top={"70px"}
                    right="15px"
                    overflow="hidden"
                    p={3}
                    sx={{
                      backgroundColor: "white",
                    }}
                  >
                    {dropDownElems.map((x) => (
                      <Link
                        style={{
                          color: "#001D4B",
                          padding: 3,
                        }}
                        to={x.path}
                      >
                        {x.label}
                      </Link>
                    ))}
                  </Box>
                </ClickAwayListener>
              )}
            </Box>

            {/* Destop Drop down */}
            <Box
              display={{ xs: "none", md: "flex" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <NavLink
                to="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Typography mx={1} fontWeight={700}>
                  Dashboard
                </Typography>
              </NavLink>

              <NavLink
                to="/all-transactions"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Typography variant="body1" mx={1} fontWeight={700}>
                  All Transactions
                </Typography>
              </NavLink>

              <NavLink
                to="/notification"
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                  margin: "0px 20px",
                }}
              >
                {true ? <NotificationIcon /> : <NotificationsIcon />}
              </NavLink>

              <Box position="relative">
                <img
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  src={avatar}
                  alt="avatar"
                  onClick={handleClick}
                />
                {open && (
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box
                      bgcolor="#fff"
                      color="#001D4B"
                      width="118px"
                      overflow="hidden"
                      borderRadius="2px"
                      sx={{
                        position: "absolute",
                        right: 20,
                        bottom: -200,
                      }}
                      py={1}
                    >
                      {dropDownElems.map((x, i) => (
                        <Link to={x.path} key={i}>
                          <AppMenuItem {...x} />
                        </Link>
                      ))}
                    </Box>
                  </ClickAwayListener>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </AppBar>
    </div>
  );
}
