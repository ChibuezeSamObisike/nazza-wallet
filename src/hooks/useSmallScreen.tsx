import { useTheme, useMediaQuery } from "@mui/material";

export default function useSmallScreen(): boolean {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return isSmallScreen;
}
