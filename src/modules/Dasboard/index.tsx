import TotalCard from "components/dashboard/TotalCard";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ReactComponent as Invite } from "assets/invite.svg";
import { Box, Button, Grid, Typography } from "@mui/material";
import BasicTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";
import SellModal from "components/modals/SellModal";
import { useState } from "react";

import ConfirmSellModal from "components/modals/ConfirmSell";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SuccessModal from "shared/SuccessModal";

function App() {
  const navigate = useNavigate();
  const [openSell, setOpenSell] = useState<boolean>(false);
  const [confirmSellOpen, setConfirmSellOpen] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  const handleSucessClose = (): void => {
    setOpenSuccess(false);
  };

  const handleSucessOpen = (): void => {
    setOpenSuccess(true);
  };

  const handleSellClose = (): void => {
    setOpenSell(false);
  };

  const handleConfirmSellOpen = () => {
    handleSellClose();
    setConfirmSellOpen(true);
  };

  const handleConfirmSellClose = () => {
    setConfirmSellOpen(false);
  };

  const handleSellOpen = (): void => {
    setOpenSell(true);
  };

  return (
    <div>
      <SellModal
        open={openSell}
        close={handleSellClose}
        openNext={handleConfirmSellOpen}
      />
      <ConfirmSellModal
        open={confirmSellOpen}
        close={handleConfirmSellClose}
        handleSuccessOpen={handleSucessOpen}
      />
      <SuccessModal
        title='Successful'
        open={openSuccess}
        close={handleSucessClose}
        subtitle='Done!!'
      />
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

        <Box
          sx={{
            mt: { xs: 3, md: 0 },
          }}
        >
          <Button
            sx={{
              bgcolor: "#FFD8C2",
              color: "#441D07",
              fontWeight: 400,
              ":hover": {
                bgcolor: "#FFD8C2",
                color: "#441D07",
              },
            }}
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
      </Box>

      <TotalCard />

      <div style={{ marginTop: "40px" }}>
        <TextTag label='Transaction History' />
        <div style={{ marginBottom: "50px" }}></div>
        <BasicTable />
      </div>
    </div>
  );
}

export default App;
