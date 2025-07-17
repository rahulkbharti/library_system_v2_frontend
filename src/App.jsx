import { PersistGate } from "redux-persist/integration/react";
import MainRoutes from "./routes/index.jsx";
import { persistor, store } from "./store/store.js";
import { Provider } from "react-redux";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme({
  palette: {  
    primary: {
      main: colors.blue[700],
      light:colors.blueGrey[50],
      dark:colors.blueGrey[900],
    },
    secondary: {
      main: colors.pink[500],
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    }}
});

function App() {
  // console.log(colors)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId="268965502257-7p7sntm10gneuhano1dkbqq3pdaha6pu.apps.googleusercontent.com">
             <MainRoutes />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
