import React from "react";

import { Box, Tabs } from "@mui/material";

import Sidebar from "components/dashboard/Sidebar";

import { ReactComponent as Refer } from "assets/refer icons.svg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";

import Profile from "@mui/icons-material/Person";
import Kyc from "@mui/icons-material/FactCheck";
import SecurityIcon from "@mui/icons-material/Lock";

import AppTabs from "shared/Tabs";

import useSmallScreen from "hooks/useSmallScreen";

export default function Index({ children }: { children: React.ReactNode }) {
  const isMobile = useSmallScreen();
  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (val: number): void => {
    setValue(val);
  };

  return (
    <Box display='flex' justifyContent='space-between'>
      {!isMobile && (
        <Box
          height='100vh'
          sx={
            {
              // position: "fixed",
            }
          }
          borderRight='1px solid #EBEBEB'
          minWidth='30%'
        >
          <Sidebar handleChangeTabs={handleChangeTabs} active={value} />
        </Box>
      )}

      <Box
        ml={{ md: "0%", sm: 0 }}
        paddingRight={{ md: "20%", sm: 0 }}
        pt={6}
        pl={{ md: 6, sm: 0 }}
        bgcolor='#f8f8f8'
        width='100%'
        height='100vh'
      >
        {isMobile && (
          <Tabs
            value={value}
            // onChange={handleChangeTabs}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
          >
            {" "}
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
            </Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              py={1}
            >
              <AppTabs
                active={40}
                icon={SecurityIcon}
                label='Security'
                onClick={() => handleChangeTabs(2)}
              />
            </Box>{" "}
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              py={1}
            >
              <AppTabs
                onClick={() => handleChangeTabs(3)}
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
                label='Banks'
                icon={AccountBalanceIcon}
                index={4}
                onClick={() => handleChangeTabs(4)}
              />
            </Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              py={1}
            >
              <AppTabs
                label='Logout'
                icon={LogoutIcon}
                index={5}
                onClick={() => handleChangeTabs(5)}
              />
            </Box>
          </Tabs>
        )}

        <div>Hello world</div>
      </Box>
    </Box>
  );
}
