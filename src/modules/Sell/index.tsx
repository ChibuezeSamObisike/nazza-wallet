import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SellModal from "components/modals/SellModal";
import CashDestination from "components/modals/CashDestination";
import SummaryModal from "components/modals/SummaryModal";

import useSmallScreen from "hooks/useSmallScreen";

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

  const isMobile = useSmallScreen;

  const isStepOptional = (step: number) => {
    return step === 1;
  };

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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
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

      <Box mt={10} mx={{ xs: 2, md: 20 }}>
        {activeStep === 0 && <SellModal openNext={handleNext} />}
        {activeStep === 1 && (
          <CashDestination back={handleBack} openNext={handleNext} />
        )}
        {activeStep === 2 && (
          <SummaryModal back={handleBack} openNext={handleNext} />
        )}
      </Box>
    </Box>
  );
}
