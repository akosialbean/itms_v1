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
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BarChartIcon from "@mui/icons-material/BarChart";
import DevicesIcon from "@mui/icons-material/Devices";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer

function Header({ toggleThemeMode, themeMode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
      navigate("/hero");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUsernameClose = () => {
    setAnchorEl(null);
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
            sx={{ marginLeft: "auto" }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <List>
              {userInfo && (
                <>
                  {/* Use LinkContainer for navigation */}
                  <LinkContainer to="/">
                    <ListItem button onClick={toggleDrawer}>
                      <BarChartIcon />
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  </LinkContainer>
                  <LinkContainer to="/devices">
                    <ListItem button onClick={toggleDrawer}>
                      <DevicesIcon />
                      <ListItemText primary="Devices" />
                    </ListItem>
                  </LinkContainer>
                </>
              )}
              <ListItem button onClick={toggleThemeMode}>
                {themeMode === "dark" ? (
                  <>
                    <Brightness4Icon />
                    <ListItemText primary="Light" />
                  </>
                ) : (
                  <>
                    <Brightness7Icon />
                    <ListItemText primary="Dark" />
                  </>
                )}
              </ListItem>
              {userInfo ? (
                <ListItem button onClick={handleLogout} sx={{ color: "red" }}>
                  <ExitToAppIcon />
                  <ListItemText primary="Logout" />
                </ListItem>
              ) : (
                // Use LinkContainer for navigation
                <LinkContainer to="/login">
                  <ListItem button onClick={toggleDrawer}>
                    <ListItemText primary="Login" />
                  </ListItem>
                </LinkContainer>
              )}
            </List>
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          {userInfo && (
            <>
              {/* Use LinkContainer for navigation */}
              <LinkContainer to="/">
                <Button
                  color="inherit"
                  startIcon={<BarChartIcon />}
                >
                  Dashboard
                </Button>
              </LinkContainer>
              <LinkContainer to="/devices">
                <Button
                  color="inherit"
                  startIcon={<DevicesIcon />}
                >
                  Devices
                </Button>
              </LinkContainer>
              <Button
                color="inherit"
                onClick={toggleThemeMode}
                startIcon={
                  themeMode === "dark" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )
                }
              >
                {themeMode === 'dark' ? 'Light' : 'Dark'}
              </Button>

              <Button
                color="inherit"
                onClick={handleUsernameClick}
                aria-controls="user-menu"
                aria-haspopup="true"
                endIcon={<ArrowDropDownIcon />}
              >
                {userInfo.name}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleUsernameClose}
              >
                <MenuItem onClick={handleUsernameClose}>Profile</MenuItem>
                <MenuItem onClick={handleUsernameClose}>Add new User</MenuItem>
                <MenuItem onClick={handleLogout} className="text-danger">
                  Logout <ExitToAppIcon />
                </MenuItem>
              </Menu>
            </>
          )}
          {!userInfo && (
            // Use LinkContainer for navigation
            <LinkContainer to="/login">
              <Button
                color="inherit"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Button>
            </LinkContainer>
          )}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
