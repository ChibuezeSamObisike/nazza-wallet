import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import TextTag from "shared/TextTag";

export default function Security() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box bgcolor='#fff' p={3} pt={5}>
      <TextTag label='Security' />
      <TextField
        id='outlined-required'
        label='Old password'
        type={showPassword ? "text" : "password"}
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton>
                {" "}
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id='outlined-required'
        label='New password'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton>
                {" "}
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id='outlined-required'
        label='Confirm new password'
        fullWidth
        sx={{
          marginTop: "30px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton>
                {" "}
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
