import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestHeader from "./Test/components/TestHeader";
import TestLoginPage from "./Test/pages/TestLoginPage";
import TestRegisterPage from "./Test/pages/TestRegisterPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  const [themeMode, setThemeMode] = useState("dark");

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
        <TestHeader toggleThemeMode={toggleThemeMode} themeMode={themeMode} />
      <Container className="mt-5 pt-5">
        <TestLoginPage />
        <TestRegisterPage />
      </Container>
    </ThemeProvider>
  );
};

export default App;
