import React from "react";
import { Box, Container, IconButton } from "@mui/material";
import { ReactComponent as PatternBg } from "assets/pattern-bg.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

export default function SignInLayout({ children }: IProps) {
  const navigate = useNavigate();
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      flexDirection='column'
      justifyContent='center'
    >
      <Box
        position='absolute'
        top={{ md: -125, xs: -90 }}
        sx={{
          opacity: { xs: "30%", md: "80%" },
        }}
        right={0}
      >
        <PatternBg />
      </Box>
      <Box width='100%' pl={{ xs: 4, md: 8 }} pt={2}>
        <IconButton disableRipple onClick={() => navigate(-1)}>
          <ArrowBackIosIcon /> Back
        </IconButton>
      </Box>
      <Container>
        <Box
          display='flex'
          mt='15%'
          alignItems='center'
          justifyContent='center'
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
