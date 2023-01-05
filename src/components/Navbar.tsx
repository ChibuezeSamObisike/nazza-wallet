import React from "react";
import { AppBar, Typography, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/Nazza-logo.svg";
import avatar from "../assets/avatar.svg";
import { Container } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import { pxToRem } from "utils/pxToRem";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | boolean>(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
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
              <MenuIcon fontSize='large' />
            </Box>
            <img
              src={logo}
              alt='logo'
              width={129}
              style={{
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
            <Box display={{ xs: "flex", md: "none" }}>
              <img
                style={{ marginLeft: "10px", cursor: "pointer" }}
                src={avatar}
                onClick={handleClick}
                alt='avatar'
              />
            </Box>
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
              <Box>
                <img
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  src={avatar}
                  onClick={handleClick}
                  alt='avatar'
                />
                <Menu id='basic-menu' open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Container>
      </AppBar>
    </div>
  );
}
