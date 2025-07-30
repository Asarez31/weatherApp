// src/theme.js
import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#0077cc",
      },
      secondary: {
        main: "#ff9800",
      },
      error: {
        main: "#d32f2f",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
          },
        },
      },
    },
  });

export default getTheme;
