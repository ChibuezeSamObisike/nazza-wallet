import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ReactComponent as Bg } from "assets/card-svg.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { pxToRem } from "utils/pxToRem";
import useSmallScreen from "hooks/useSmallScreen";

export default function TotalCard() {
  const [viewPrice, setViewPrice] = useState(true);

  const isMobile = useSmallScreen();

  return (
    <Box
      p={5}
      bgcolor='background.totalCard'
      position='relative'
      overflow='hidden'
      borderRadius='8px'
    >
      <Box position='absolute' left='-65px' top='-10px'>
        <Bg />
      </Box>
      <Box
        position='absolute'
        right='-70px'
        top='10px'
        sx={{
          transform: "rotate(180deg)",
        }}
      >
        <Bg />
      </Box>

      <Box display='flex' width='100%' alignItems='center'>
        <Box display='flex' flexDirection='column'>
          <Box>
            <Typography
              variant='subtitle2'
              fontWeight={400}
              color='#001D4B'
              sx={{
                opacity: "40%",
              }}
            >
              Total Payout
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={pxToRem(isMobile ? 22 : 48)} fontWeight={700}>
              {viewPrice ? " $ 180,000.34" : "---------"}
            </Typography>
          </Box>

          <Typography color='#7587a5' fontWeight={700} fontSize={pxToRem(18)}>
            {viewPrice ? "NGN 23,000.34" : "-------"}
          </Typography>
        </Box>

        <IconButton
          sx={{
            ml: 2,
          }}
          onClick={() => setViewPrice(!viewPrice)}
        >
          <VisibilityOffIcon
            sx={{
              color: "#7785B0",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
