import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";

function MyAppBar({ toggleThemeMode, themeMode, isLoggedIn, handleLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginClick = () => {
    toggleDrawer(); // Close the drawer when navigating to login
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="../it.png"
            alt="Logo"
            style={{ width: "50px", marginRight: "1rem" }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            ITMS
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton onClick={toggleThemeMode} color="inherit">
            {themeMode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Button>
          )}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden lgUp>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem>
              <IconButton onClick={toggleThemeMode} color="inherit">
                {themeMode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </ListItem>
            {isLoggedIn ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleLoginClick}
              >
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

export default MyAppBar;
