import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";

import { ReactComponent as Bg } from "assets/card-svg.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function TotalCard() {
  const [viewPrice, setViewPrice] = useState(true);

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
      <Box display='flex' justifyContent='flex-end'>
        <IconButton onClick={() => setViewPrice(!viewPrice)}>
          <VisibilityOffIcon
            sx={{
              color: "#101628",
            }}
          />
        </IconButton>
      </Box>
      <Box
        flexDirection='column'
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='100%'
      >
        <Typography variant='subtitle1' color='#000'>
          Combine total
        </Typography>
        {viewPrice ? (
          <>
            <Typography fontSize='62px' fontWeight={700}>
              NGN0.0
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              USD 0
            </Typography>
          </>
        ) : (
          <Typography fontWeight='bold' variant='h1'>
            - - - - -
          </Typography>
        )}
      </Box>
    </Box>
  );
}
