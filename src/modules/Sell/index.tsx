import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import Typography from "@mui/material/Typography";
import SellModal from "components/modals/SellModal";
import CashDestination from "components/modals/CashDestination";
import SummaryModal from "components/modals/SummaryModal";
import TransferCrypto from "components/modals/TransferCrypto";
import TransferProcessing from "components/modals/TransferProcessing";

import useSmallScreen from "hooks/useSmallScreen";

import axios from "axios";

const steps = [
  { title: "Choose amount", subtitle: "Enter the amount you want to sell " },
  { title: "Account", subtitle: "Select your cash destination " },
  { title: "Summary", subtitle: "Preview summary  of your transaction " },
  { title: "Transfer", subtitle: "Preview summary  of your transaction " },
  {
    title: "Transaction status",
    subtitle: "After confirmation  you will be credited ",
  },
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isMobile = useSmallScreen();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    const dataInfo = async () => {
      // const res = await axios.get(
      //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      // );

      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: "usd", // Set the currency to USD
            ids: "bitcoin,ethereum,tether", // Comma-separated list of coin ids
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );

      // console.log("Data info for coins", res.data[0].current_price);
      return res.data[0].current_price;
    };

    dataInfo();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile && (
        <Box
          bgcolor='#D4D4D4'
          sx={{
            height: "2px",
          }}
        >
          <Box
            bgcolor='#2574F5'
            sx={{
              height: "2px",
              transition: (theme) => theme.transitions.easing.easeIn,
              width: `${((activeStep + 1) / 5) * 100}%`,
            }}
          ></Box>
        </Box>
      )}
      {!isMobile && (
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            labelProps.optional = (
              <Typography variant='caption'>{label.subtitle}</Typography>
            );

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label.title} {...stepProps}>
                <StepLabel {...labelProps}>{label.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}

      <SellProvider>
        <Box mt={10} mx={{ xs: 2, md: 40 }}>
          {activeStep === 0 && <SellModal openNext={handleNext} />}
          {activeStep === 1 && (
            <CashDestination back={handleBack} openNext={handleNext} />
          )}
          {activeStep === 2 && (
            <SummaryModal back={handleBack} openNext={handleNext} />
          )}
          {activeStep === 3 && <TransferCrypto openNext={handleNext} />}
          {activeStep === 4 && <TransferProcessing />}
        </Box>
      </SellProvider>
    </Box>
  );
}

const SellContext = React.createContext<any>({});

const SellProvider = ({ children }: any) => {
  const [sellVal, setSellVal] = React.useState({
    amount: "",
    coin_id: "",
    type: "1",
  });
  const [viewData, setViewData] = React.useState({});
  return (
    <SellContext.Provider
      value={{ sellVal, setSellVal, viewData, setViewData }}
    >
      {children}
    </SellContext.Provider>
  );
};

export const useSell = () => {
  return React.useContext(SellContext);
};
