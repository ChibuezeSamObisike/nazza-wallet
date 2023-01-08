import TotalCard from "components/dashboard/TotalCard";
import VerifyKyc from "components/dashboard/VerifyKyc";
import PaymentTypeCard from "components/dashboard/SendPaymentTypeCard";
import DepositPaymentTypeCard from "components/dashboard/DepositPaymentTypeCard";
import WithdrawPaymentTypeCard from "components/dashboard/WithdrawPaymentTypeCard";
import { Box, Button, Grid } from "@mui/material";
import BasicTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";
import SellModal from "components/SellModal";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      {/* <SellModal /> */}
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate("referrals")}
        >
          Refer and earn
        </Button>
      </Box>
      <VerifyKyc />
      <TotalCard />
      <Box mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <PaymentTypeCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <DepositPaymentTypeCard />
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
