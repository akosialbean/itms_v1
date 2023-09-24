import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Button,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Header({ toggleThemeMode, themeMode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src="../it.png"
            alt="Logo"
            style={{ width: "45px", marginRight: "1rem" }}
          />
          ITMS
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdUp>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            sx={{ marginLeft: "auto" }} // Align hamburger menu to the right
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <List>
              {userInfo && (
                <>
                  <ListItem
                    button
                    component={Link}
                    to="/"
                    onClick={toggleDrawer}
                  >
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/devices"
                    onClick={toggleDrawer}
                  >
                    <ListItemText primary="Devices" />
                  </ListItem>
                </>
              )}
              <ListItem button onClick={toggleThemeMode}>
                <ListItemText primary="Toggle Theme" />
              </ListItem>
              {userInfo ? (
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              ) : (
                <ListItem
                  button
                  component={Link}
                  to="/login"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          {/* Show "Dashboard" and "Devices" on larger screens */}
          {userInfo && (
            <>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/devices">
                Devices
              </Button>
            </>
          )}
          <IconButton onClick={toggleThemeMode} color="inherit">
            {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {userInfo ? (
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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
