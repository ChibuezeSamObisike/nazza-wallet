import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { ReactComponent as Avatar } from "assets/Avatar profile-upload.svg";

export default function Sidebar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
          <Tabs
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#001D4B",
              },
            }}
            sx={{
              borderRight: 1,
              borderColor: "divider",
              textTransform: "inherit",
              ".MuiTabs-indicator": {
                left: 0,
              },
            }}
          >
            <Tab
              label='Item One'
              sx={{
                ...(value === 0 && {
                  background: "#EFF3FF",
                }),
                textTransform: "none",
                textAlign: "left",
              }}
            />
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}
