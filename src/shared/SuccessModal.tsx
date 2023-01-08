import * as React from "react";

import successGif from "assets/successCheck.gif";

import { Typography, Box } from "@mui/material";
import AppModal from "components/AppModal";

import { pxToRem } from "utils/pxToRem";

interface ISuccessProps {
  open: boolean;
  close: () => void;
  subtitle: string;
  title: string;
}

export interface IModalProps {
  open: boolean;
  close: () => void;
  title?: string;
  subtitle?: string;
  isEdit?: boolean;
  duration?: number;
}

const SuccessModal: React.FC<ISuccessProps> = ({
  open,
  close,
  title,
  subtitle,
}: ISuccessProps) => {
  setTimeout(() => {
    close();
  }, 40000);

  return (
    <div>
      <AppModal
        open={open}
        close={close}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box display='flex' flexDirection='column' alignItems='center'>
          <img
            src={successGif}
            alt='success'
            className='img'
            height={200}
            width={200}
          />

          <Typography fontSize={pxToRem(32)} pt={4} mb={2} fontWeight='bold'>
            {title}
          </Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      </AppModal>
    </div>
  );
};

export default SuccessModal;
