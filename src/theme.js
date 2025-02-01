import { createTheme } from "@mui/material/styles";

export const primary = {
  100: "#d8e6fd",
  200: "#b1cdfb",
  300: "#89b4fa",
  400: "#629bf8",
  500: "#3b82f6",
  600: "#2f68c5",
  700: "#234e94",
  800: "#183462",
  900: "#0c1a31",
};

export const secondary = {
  100: "#d3f3df",
  200: "#a7e8bf",
  300: "#7adc9e",
  400: "#4ed17e",
  500: "#22c55e",
  600: "#1b9e4b",
  700: "#147638",
  800: "#0e4f26",
  900: "#072713",
};

export const accent = {
  100: "#fdecce",
  200: "#fbd89d",
  300: "#f9c56d",
  400: "#f7b13c",
  500: "#f59e0b",
  600: "#c47e09",
  700: "#935f07",
  800: "#623f04",
  900: "#312002",
};

export const danger = {
  100: "#fcdada",
  200: "#f9b4b4",
  300: "#f58f8f",
  400: "#f26969",
  500: "#ef4444",
  600: "#bf3636",
  700: "#8f2929",
  800: "#601b1b",
  900: "#300e0e",
};

export const info = {
  100: "#cdf0f6",
  200: "#9be2ee",
  300: "#6ad3e5",
  400: "#38c5dd",
  500: "#06b6d4",
  600: "#0592aa",
  700: "#046d7f",
  800: "#024955",
  900: "#01242a",
};

export const background = {
  100: "#d2d2d2",
  200: "#a5a5a5",
  300: "#787878",
  400: "#4b4b4b",
  500: "#1e1e1e",
  600: "#181818",
  700: "#121212",
  800: "#0c0c0c",
  900: "#060606",
};

export const cardBackground = {
  100: "#d4d4d4",
  200: "#aaaaaa",
  300: "#7f7f7f",
  400: "#555555",
  500: "#2a2a2a",
  600: "#222222",
  700: "#191919",
  800: "#111111",
  900: "#080808",
};

export const textPrimary = {
  100: "#fdfdfd",
  200: "#fafbfb",
  300: "#f8f8fa",
  400: "#f5f6f8",
  500: "#f3f4f6",
  600: "#c2c3c5",
  700: "#929294",
  800: "#616262",
  900: "#313131",
};

export const textSecondary = {
  100: "#ebedef",
  200: "#d7dadf",
  300: "#c4c8cf",
  400: "#b0b5bf",
  500: "#9ca3af",
  600: "#7d828c",
  700: "#5e6269",
  800: "#3e4146",
  900: "#1f2123",
};

export const borders = {
  100: "#d7d9dc",
  200: "#afb3b9",
  300: "#878d97",
  400: "#5f6774",
  500: "#374151",
  600: "#2c3441",
  700: "#212731",
  800: "#161a20",
  900: "#0b0d10",
};

const theme = createTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
      contrastText: textPrimary[500],
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[700],
      contrastText: textPrimary[500],
    },
    accent: {
      light: accent[300],
      main: accent[500],
      dark: accent[700],
      contrastText: textPrimary[500],
    },
    error: {
      light: danger[300],
      main: danger[500],
      dark: danger[700],
      contrastText: textPrimary[500],
    },
    warning: {
      light: accent[300],
      main: accent[500],
      dark: accent[700],
      contrastText: textPrimary[500],
    },
    info: {
      light: info[300],
      main: info[500],
      dark: info[700],
      contrastText: textPrimary[500],
    },
    background: {
      default: background[500],
      paper: cardBackground[500],
    },
    text: {
      primary: textPrimary[500],
      secondary: textSecondary[500],
    },
    divider: borders[500],
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Change if needed
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    h4: { fontSize: "1.25rem", fontWeight: 500 },
    body1: { fontSize: "1rem", color: textPrimary[500] },
    body2: { fontSize: "0.875rem", color: textSecondary[500] },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: cardBackground[500],
          color: textPrimary[500],
          borderRadius: "12px",
          padding: "16px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: background[600],
        },
      },
    },
  },
});

export default theme;
