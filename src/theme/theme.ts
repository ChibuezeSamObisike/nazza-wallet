import { createTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";

declare module "@mui/material/styles/createPalette" {
  interface Theme {
    background: {
      totalCard: React.CSSProperties["color"];
    };
  }

  interface ThemeOptions {
    background: {
      totalCard: React.CSSProperties["color"];
    };
  }

  interface TypeBackground {
    totalCard: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2574F5",
    },
    secondary: {
      main: "#101628",
    },
    background: {
      default: "#fff",
      totalCard: "#E9F1FF",
    },
    text: {
      primary: "#001D4B",
    },
  },
  typography: {
    fontFamily: ["Plus Jakarta Sans"].join(","),
    fontWeightBold: 700,
    h1: {
      fontSize: pxToRem(64),
    },
    h2: {
      fontSize: pxToRem(48),
    },
    h3: {
      fontSize: pxToRem(32),
    },
    subtitle1: {
      fontSize: pxToRem(28),
    },
    subtitle2: {
      fontSize: pxToRem(22),
    },
    body1: {
      fontSize: pxToRem(16),
      fontWeight: 500,
    },
    body2: {
      fontSize: pxToRem(14),
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        color: "primary",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "initial",
          fontWeight: "bolder",
          padding: "16px 21px",
          fontSize: pxToRem(16),
        },
        containedPrimary: {
          backgroundColor: "#001D4B",
          ":hover": {
            color: "white",
          },
        },
        containedSecondary: {
          backgroundColor: "#EBEBEB",
          color: "#001D4B",
          ":hover": {
            backgroundColor: "#EBEBEB",
          },
        },
      },
    },
  },
});

export default theme;
