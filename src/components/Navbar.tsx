import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  ClickAwayListener,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "assets/Nazza-logo.svg";
import avatar from "assets/avatar.svg";
import { Container } from "@mui/system";
import { NavLink, useNavigate, Link } from "react-router-dom";
import MenuDrawer from "./dashboard/MenuDrawer";
import AppMenuItem from "./menu/AppMenuItem";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | boolean>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { label: "Sign Out", path: "/login" },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <MenuDrawer
        open={openModal}
        close={() => {
          setOpenModal(false);
        }}
      />
      <AppBar
        position='sticky'
        sx={{
          marginBottom: "60px",
        }}
        elevation={0}
      >
        <Container>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
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
                <MenuIcon fontSize='large' />
              </IconButton>
            </Box>
            <img
              src={logo}
              alt='logo'
              width={isSmallScreen ? 100 : 129}
              style={{
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />

            <Box display={{ xs: "flex", md: "none" }}>
              <img
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  position: "relative",
                }}
                src={avatar}
                onClick={() => setMobileMenuOpen(true)}
                alt='avatar'
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
                    right='15px'
                    overflow='hidden'
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
              justifyContent='space-between'
              alignItems='center'
            >
              <NavLink
                to='/'
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Typography mx={1} fontWeight={700}>
                  Dashboard
                </Typography>
              </NavLink>
              <NavLink
                to='/wallet'
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Typography variant='body1' mx={1} fontWeight={700}>
                  Wallet
                </Typography>
              </NavLink>
              <NavLink
                to='/referrals'
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Typography variant='body1' mx={1} fontWeight={700}>
                  Refferals
                </Typography>
              </NavLink>

              <Box position='relative'>
                <img
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  src={avatar}
                  alt='avatar'
                  onClick={handleClick}
                />
                {open && (
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box
                      bgcolor='#fff'
                      color='#001D4B'
                      width='118px'
                      overflow='hidden'
                      borderRadius='2px'
                      boxShadow='0px 8.4446px 16.8892px rgba(0, 0, 0, 0.06), 0px 16.8892px 25.3338px rgba(0, 0, 0, 0.1);'
                      sx={{
                        position: "absolute",
                        right: 20,
                        bottom: -140,
                      }}
                      py={2}
                    >
                      {dropDownElems.map((x) => (
                        <Link to={x.path}>
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
