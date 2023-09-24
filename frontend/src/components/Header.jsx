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

function Header({ toggleThemeMode, themeMode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Toolbar disableGutters>
            {/* Logo and title */}
            <img
              src="../it.png"
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
              justifyContent: "flex-end",
            }}
          >
            {/* Toggle Theme Icon */}
            {screenWidth >= 899 && (
              <IconButton onClick={toggleThemeMode} color="inherit">
                {themeMode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            )}
            {/* Login Button */}
            {screenWidth >= 899 ? (
              <Button color="inherit">Login</Button>
            ) : (
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
            )}
          </Toolbar>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
            }}
          >
            <List>
              <ListItem>
                {/* Toggle Theme Icon (inside the drawer) */}
                {screenWidth < 899 && (
                  <IconButton onClick={toggleThemeMode} color="inherit">
                    {themeMode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                )}
              </ListItem>
              {/* Login Button (inside the drawer) */}
              {screenWidth < 899 && (
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

export default Header;
