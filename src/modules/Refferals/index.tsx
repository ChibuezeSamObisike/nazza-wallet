import React, { useEffect } from "react";

import { Box } from "@mui/material";

import Sidebar from "components/dashboard/Sidebar";
import Security from "components/referrals/Security";
import ProfileDetails from "components/ProfileDetails";
import KycVerification from "components/KycVerification";
import ReferEarn from "components/ReferEarn";
import KycSideBar from "components/KycSideBar";

import useSmallScreen from "hooks/useSmallScreen";

import { useNavigate } from "react-router-dom";

export default function Index({ children }: { children: any }) {
  const isMobile = useSmallScreen();
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();

  const handleChangeTabs = (val: number): void => {
    navigate("/referral");
    setValue(val);
  };

  useEffect(() => {
    if (isMobile) {
      setValue(-1);
    } else {
      setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

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
          <Sidebar handleChangeTabs={handleChangeTabs} active={value} />
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
        {value === -1 && <KycSideBar handleChangeTabs={handleChangeTabs} />}
        {value === 0 && <ProfileDetails />}
        {value === 1 && <KycVerification />}
        {value === 2 && <Security />}
        {value === 3 && <ReferEarn />}
      </Box>
    </Box>
  );
}
