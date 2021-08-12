import React from "react";

import ClippedDrawer from "./components/ClippedDrawer";

import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ClippedDrawer />
    </ThemeProvider>
  );
}

export default App;
