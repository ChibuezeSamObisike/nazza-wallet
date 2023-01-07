import { Box, Typography } from "@mui/material";
import { ReactComponent as Avatar } from "assets/Avatar profile-upload.svg";
import { ReactComponent as Profile } from "assets/profile.svg";
import { ReactComponent as Kyc } from "assets/KycIcon.svg";
import { ReactComponent as Security } from "assets/SecurityIcon.svg";
import { ReactComponent as Refer } from "assets/refer icons.svg";
import AppTabs from "shared/Tabs";

export default function Sidebar({
  handleChangeTabs,
}: {
  handleChangeTabs: (val: number) => void;
}) {
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        ml={20}
        pt={10}
      >
        <Avatar />
        <Typography variant='h3' pt={4} fontWeight='bold'>
          Olugwu Samuel
        </Typography>
        <Typography mt={1} color='#5D5C63' fontWeight='400'>
          Ogbonnasamuel67@gmail.com
        </Typography>
      </Box>
      <Box mt={10} width='100%' display='flex' justifyContent='flex-end'>
        <Box width='60%'>
          <AppTabs
            label='Profile'
            icon={Profile}
            onClick={() => handleChangeTabs(0)}
          />
          <AppTabs
            label='KYC (verify Identity)'
            icon={Kyc}
            onClick={() => handleChangeTabs(1)}
          />
          <AppTabs
            label='Security'
            icon={Security}
            onClick={() => handleChangeTabs(2)}
          />
          <AppTabs
            label='Refer and Earn'
            icon={Refer}
            onClick={() => handleChangeTabs(3)}
          />
        </Box>
      </Box>
    </Box>
  );
}
