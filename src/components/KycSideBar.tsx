import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Profile from "@mui/icons-material/Person";
import Kyc from "@mui/icons-material/FactCheck";
import Security from "@mui/icons-material/Lock";
import { ReactComponent as Refer } from "assets/refer icons.svg";
import { Box, Typography, IconButton } from "@mui/material";
import { pxToRem } from "utils/pxToRem";
import AppTabs from "shared/Tabs";

export default function KycSideBar({
  handleChangeTabs,
}: {
  handleChangeTabs?: (val: number | undefined | null) => void;
}) {
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
          onClick={() => handleChangeTabs?.(0)}
        />
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
          onClick={() => handleChangeTabs?.(1)}
        />
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
          onClick={() => handleChangeTabs?.(2)}
        />
      </Box>{" "}
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          // onClick={() => handleChangeTabs?.()}
          active={40}
          icon={Refer}
          label='Refer and Earn'
        />{" "}
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          // onClick={() => handleChangeTabs?.()}
          active={40}
          icon={Refer}
          label='Refer and Earn'
        />{" "}
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={1}
      >
        <AppTabs
          // onClick={() => handleChangeTabs()}
          active={40}
          icon={Refer}
          label='Refer and Earn'
        />{" "}
      </Box>
    </Box>
  );
}
