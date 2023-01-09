import React from "react";
import { Box, Container } from "@mui/material";
import { ReactComponent as PatternBg } from "assets/pattern-bg.svg";

interface IProps {
  children: React.ReactNode;
}

export default function SignInLayout({ children }: IProps) {
  return (
    <Box position='relative'>
      <Box position='absolute' top={{ md: -90, xs: -60 }} right={0} mb={5}>
        <PatternBg />
      </Box>
      <Container>
        <Box
          display='flex'
          alignItems='center'
          pt={{ md: 50, xs: 30 }}
          justifyContent='center'
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
