import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/dashboard/Sidebar";

import Security from "components/referrals/Security";
import ProfileDetails from "components/ProfileDetails";
import KycVerification from "components/KycVerification";
import useSmallScreen from "hooks/useSmallScreen";

export default function Index({ children }: { children: any }) {
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
          sx={{
            position: "fixed",
          }}
          borderRight='1px solid #EBEBEB'
          minWidth='30%'
        >
          <Sidebar handleChangeTabs={handleChangeTabs} />
        </Box>
      )}

      <Box
        ml={{ md: "30%", sm: 0 }}
        paddingRight={{ md: "20%", sm: 0 }}
        pt={6}
        pl={{ md: 6, sm: 0 }}
        bgcolor='#f8f8f8'
        width='100%'
        height='100vh'
      >
        {value === 0 && <ProfileDetails />}
        {value === 1 && <KycVerification />}
        {value === 2 && <Security />}
      </Box>
    </Box>
  );
}
