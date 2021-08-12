import React from "react";

import ClippedDrawer from "./components/ClippedDrawer";
import Header from "./pages/Header";

import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { DataProvider } from "./GlobalState";
import { BrowserRouter } from "react-router-dom";


const theme = createTheme({});

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <ClippedDrawer />
        </ThemeProvider>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
