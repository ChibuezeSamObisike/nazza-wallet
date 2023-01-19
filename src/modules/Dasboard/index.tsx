import TotalCard from "components/dashboard/TotalCard";

import PaymentTypeCard from "components/dashboard/SendPaymentTypeCard";
import DepositPaymentTypeCard from "components/dashboard/DepositPaymentTypeCard";
import WithdrawPaymentTypeCard from "components/dashboard/WithdrawPaymentTypeCard";
import { Box, Grid, Typography } from "@mui/material";
import BasicTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";
import SellModal from "components/modals/SellModal";
import { useState } from "react";

import ConfirmSellModal from "components/modals/ConfirmSell";
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
      <Box display='flex' mb={4}>
        <Typography variant='h3' fontWeight='bold' color='#47454C'>
          Welcome, Sam <span className='wave'>👋</span>
        </Typography>
      </Box>

      <TotalCard />
      <Box mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <PaymentTypeCard onClick={handleSellOpen} />
          </Grid>
          <Grid item xs={12} md={4}>
            <WithdrawPaymentTypeCard />
          </Grid>
        </Grid>
      </Box>
      <div style={{ marginTop: "40px" }}>
        <TextTag label='Transaction History' />
        <div style={{ marginBottom: "50px" }}></div>
        <BasicTable />
      </div>
    </div>
  );
}

export default App;
