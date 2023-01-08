import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Profile from "@mui/icons-material/Person";
import Kyc from "@mui/icons-material/FactCheck";
import Security from "@mui/icons-material/Lock";
import { ReactComponent as Refer } from "assets/refer icons.svg";
import { Box, Typography, IconButton } from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import AppTabs from "shared/Tabs";
import useSmallScreen from "hooks/useSmallScreen";
import { useNavigate } from "react-router-dom";

export default function KycSideBar({
  handleChangeTabs,
}: {
  handleChangeTabs?: any;
}) {
  const navigate = useNavigate();
  const isMobile = useSmallScreen();

  return (
    <Box p={2}>
      <Box display='flex' textAlign='center' alignItems='center'>
        <IconButton
          sx={{
            color: "#000",
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: pxToRem(32),
            }}
          />
        </IconButton>
        <Box mx='auto'>
          <Typography
            variant='subtitle2'
            fontSize={pxToRem(22)}
            fontWeight={700}
            ml={-5}
          >
            Account
          </Typography>
        </Box>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          icon={Profile}
          active={40}
          label='Profile'
          onClick={() => handleChangeTabs(0)}
        />
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          active={40}
          icon={Kyc}
          label='KYC (verify Identity)'
          onClick={() => handleChangeTabs(1)}
        />
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          active={40}
          icon={Security}
          label='Security'
          onClick={() => handleChangeTabs(2)}
        />
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>{" "}
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          onClick={() => handleChangeTabs()}
          active={40}
          icon={Refer}
          label='Refer and Earn'
        />{" "}
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
