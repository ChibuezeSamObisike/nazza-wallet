import React, { Fragment, ReactElement, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import useSmallScreen from "hooks/useSmallScreen";
import { pxToRem } from "utils/pxToRem";

export default function SellSmallScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode | JSX.Element | ReactElement | any;
}) {
  const isSmallScreen = useSmallScreen();
  if (isSmallScreen) {
    return (
      <>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <>
            <Typography fontWeight={700} color='#5D5C63' fontSize={pxToRem(32)}>
              {title}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={pxToRem(18)}
              color='#5D5C63'
              mb={3}
            >
              {subtitle}
            </Typography>
          </>
        </Box>
        <Box mb={{ xs: 8, md: 0 }}>{children}</Box>
      </>
    );
  } else {
    return <Box>{children}</Box>;
  }
}
