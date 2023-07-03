import React from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TextTag({
  label,
  style,
  isSearch,
}: {
  label: string;
  style?: React.CSSProperties;
  isSearch?: boolean;
}) {
  return (
    <Box
      bgcolor='#FFFFFF'
      p='20px'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      color='#101628'
      sx={{ ...style }}
    >
      <Typography variant='subtitle2' fontWeight='bold'>
        {label}
      </Typography>

      {isSearch && (
        <Box>
          <TextField
            placeholder='Search'
            sx={{
              bgcolor: "grey.100",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </Box>
  );
}
