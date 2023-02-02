import TotalCard from "components/dashboard/TotalCard";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Button, Typography } from "@mui/material";
import BasicTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";

import useSmallScreen from "hooks/useSmallScreen";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getDecodedJwt, getName } from "utils/auth";
import { useEffect } from "react";

import { useGetUser } from "contexts/UserProvider";

function App() {
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreen();
  const { user } = useGetUser();
  const tD = getDecodedJwt();

  useEffect(() => {
    console.log("User det", getName());
  }, []);

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
          Welcome, Chibueze
          <span className='wave'>👋</span>
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
          <Button fullWidth onClick={() => navigate("/sell")}>
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
