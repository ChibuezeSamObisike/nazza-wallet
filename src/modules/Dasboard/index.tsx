import TotalCard from "components/dashboard/TotalCard";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ReactComponent as Invite } from "assets/invite.svg";
import { Box, Button, Grid, Typography } from "@mui/material";
import BasicTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import useSmallScreen from "hooks/useSmallScreen";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SuccessModal from "shared/SuccessModal";

function App() {
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreen();

  return (
    <div>
      <Box
        display='flex'
        flexDirection={{ xs: "column", md: "row" }}
        mb={4}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent='space-between'
      >
        <Typography variant='h3' fontWeight='bold' color='#47454C'>
          Welcome, Sam <span className='wave'>👋</span>
        </Typography>

        {!isSmallScreen && (
          <Box
            sx={{
              mt: { xs: 3, md: 0 },
            }}
          >
            <Button onClick={() => navigate("/sell")}>
              <OpenInNewIcon
                sx={{
                  mr: 1,
                  fontWeight: 400,
                }}
              />{" "}
              Sell Crypto
            </Button>
            <Button
              onClick={() => navigate("/referrals")}
              sx={{
                bgcolor: "#FFF5D8",
                color: "#423308",
                fontWeight: 400,
                ":hover": {
                  bgcolor: "#FFF5D8",
                  color: "#423308",
                },
                ml: 3,
              }}
            >
              <PersonAddAltIcon
                sx={{
                  mr: 1,
                  fontWeight: 400,
                }}
              />
              Invite
            </Button>
          </Box>
        )}
      </Box>

      <TotalCard />
      {isSmallScreen && (
        <Box
          alignItems='center'
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          sx={{
            mt: { xs: 3, md: 0 },
            width: "100%",
          }}
        >
          <Button
            fullWidth
            sx={{
              bgcolor: "#FFD8C2",
              color: "#441D07",
              fontWeight: 400,
              ":hover": {
                bgcolor: "#FFD8C2",
                color: "#441D07",
              },
            }}
            onClick={() => navigate("/sell")}
          >
            <OpenInNewIcon
              sx={{
                mr: 1,
                fontWeight: 400,
              }}
            />{" "}
            Sell Crypto
          </Button>
          <Button
            fullWidth
            onClick={() => navigate("/referrals")}
            sx={{
              bgcolor: "#FFF5D8",
              color: "#423308",
              fontWeight: 400,
              mt: 2,

              ":hover": {
                bgcolor: "#FFF5D8",
                color: "#423308",
              },
            }}
          >
            <PersonAddAltIcon
              sx={{
                mr: 1,
                fontWeight: 400,
              }}
            />
            Invite
          </Button>
        </Box>
      )}

      <div style={{ marginTop: "40px" }}>
        <TextTag label='Transaction History' />
        <div style={{ marginBottom: "50px" }}></div>
        <BasicTable />
      </div>
    </div>
  );
}

export default App;
