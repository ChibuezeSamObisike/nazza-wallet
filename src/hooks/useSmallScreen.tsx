import { useTheme, useMediaQuery } from "@mui/material";

export default function useSmallScreen() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return isSmallScreen;
}
