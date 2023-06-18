import { Box, Typography } from "@mui/material";
import { ReactComponent as Avatar } from "assets/Avatar profile-upload.svg";
import Profile from "@mui/icons-material/Person";
import Kyc from "@mui/icons-material/FactCheck";
import Security from "@mui/icons-material/Lock";
import { ReactComponent as Refer } from "assets/refer icons.svg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { getProfileDetails } from "services/AppService";
import { useQuery } from "react-query";
import AppTabs from "shared/Tabs";

export default function Sidebar({
  handleChangeTabs,
  active,
}: {
  handleChangeTabs: (val: number) => void;
  active?: number;
}) {
  const { data } = useQuery("fetchUserDetails", getProfileDetails);

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
        {/* <Avatar /> */}
        <Box
          width='200px'
          height='200px'
          display='flex'
          alignItems='center'
          justifyContent='center'
          bgcolor='grey'
          borderRadius='50%'
        >
          <Typography color='#fff' fontSize={90}>
            {data?.name[0]} {data?.lastname[0]}
          </Typography>
        </Box>
        <Typography textAlign={"center"} variant='h3' pt={4} fontWeight='bold'>
          {data?.name} {data?.lastname}
        </Typography>
        <Typography mt={1} color='#5D5C63' fontWeight='400'>
          {data?.email}
        </Typography>
      </Box>
      <Box mt={6} width='100%' display='flex' justifyContent='flex-end'>
        <Box width='60%'>
          <AppTabs
            label='Profile'
            icon={Profile}
            index={0}
            active={active}
            onClick={() => handleChangeTabs(0)}
          />
          <AppTabs
            label='KYC (verify Identity)'
            icon={Kyc}
            index={1}
            active={active}
            onClick={() => handleChangeTabs(1)}
          />
          <AppTabs
            label='Security'
            icon={Security}
            index={2}
            active={active}
            onClick={() => handleChangeTabs(2)}
          />
          <AppTabs
            label='Invite'
            icon={Refer}
            index={3}
            active={active}
            onClick={() => handleChangeTabs(3)}
          />
          <AppTabs
            label='Banks'
            icon={AccountBalanceIcon}
            index={4}
            active={active}
            onClick={() => handleChangeTabs(4)}
          />
          <AppTabs
            label='Logout'
            icon={LogoutRoundedIcon}
            index={5}
            active={active}
            onClick={() => handleChangeTabs(5)}
          />
        </Box>
      </Box>
    </Box>
  );
}
