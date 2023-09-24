import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function TestHeader({ toggleThemeMode, themeMode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showLoginButton, setShowLoginButton] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setShowLoginButton(false); // Hide the login button when the drawer is opened
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    setShowLoginButton(screenWidth >= 768); // Adjust the breakpoint to >= 768 pixels
  };

  React.useEffect(() => {
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Toolbar disableGutters>
            <img
              src="../it.png" // Update the path to your image
              alt="Logo"
              style={{ width: "45px", marginRight: "1rem" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ITMS
            </Typography>
          </Toolbar>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Align to the end
            }}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
                ml: 2,
              }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={toggleThemeMode}
              color="inherit"
            >
              {themeMode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {showLoginButton && (
              <Button color="inherit">Login</Button>
            )}
          </Toolbar>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 } }}
          >
            <List>
              <ListItem>
                <IconButton
                  onClick={toggleThemeMode}
                  color="inherit"
                >
                  {themeMode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </ListItem>
              {showLoginButton && (
                <ListItem button onClick={toggleDrawer}>
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TestHeader;
