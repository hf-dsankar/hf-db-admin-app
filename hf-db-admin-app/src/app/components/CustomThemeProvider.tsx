"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#044D82", // --color-primary
      light: "#0666a3",
      dark: "#033a5c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#019EB1", // --color-accent
      light: "#33b1c1",
      dark: "#016e7c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    info: {
      main: "#019EB1", // Using accent color for info
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#f9fafb",
          fontWeight: 600,
        },
      },
    },
  },
});

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
