import React from "react";
import { Box, Container } from "@mui/material";
import { ReactComponent as PatternBg } from "assets/pattern-bg.svg";

interface IProps {
  children: React.ReactNode;
}

export default function SignInLayout({ children }: IProps) {
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        position='absolute'
        top={{ md: -90, xs: -90 }}
        sx={{
          opacity: { xs: "30%", md: "80%" },
        }}
        right={0}
      >
        <PatternBg />
      </Box>
      <Container>
        <Box
          display='flex'
          mt='25%'
          alignItems='center'
          justifyContent='center'
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
