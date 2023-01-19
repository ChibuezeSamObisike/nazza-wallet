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
      <Box position='absolute' left='-5px' top='-10px'>
        <Bg />
      </Box>
      <Box
        position='absolute'
        right='-40px'
        top='10px'
        sx={{
          transform: "rotate(180deg)",
        }}
      >
        <Bg />
      </Box>

      <Box flexDirection='column' display='flex' width='100%'>
        {viewPrice ? (
          <Box display='flex' flexDirection='column' ml={isMobile ? 15 : 20}>
            <Box>
              <Typography
                fontSize={pxToRem(isMobile ? 50 : 62)}
                fontWeight={700}
              >
                <span
                  style={{
                    fontSize: pxToRem(22),
                    color: "rgba(0, 29, 75, 0.5)",
                  }}
                >
                  USD
                </span>{" "}
                0346
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='subtitle2'
                fontWeight={400}
                color='#001D4B'
                sx={{
                  opacity: "40%",
                }}
              >
                Total Payout balance in
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography fontWeight='bold' variant='h1'>
            * * * * *
          </Typography>
        )}

        <IconButton onClick={() => setViewPrice(!viewPrice)}>
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
