import { ThemeOptions,colors } from "@mui/material";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    status: {
        danger : React.CSSProperties["color"];
    }
  }
  interface Theme {
    status: {
      danger: string;
    };
    custom: {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      primaryColor?: string;
      secondaryColor?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  }
}