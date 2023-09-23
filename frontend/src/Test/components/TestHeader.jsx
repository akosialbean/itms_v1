import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function TestHeader() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showLoginButton, setShowLoginButton] = React.useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
                display: { xs: "none", sm: "none", md: "flex" }, // Hide on xs and sm, display on md
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
          {/* Display the IconButton on xs, sm, hide on md */}
          {showLoginButton ? (
            <Button color="inherit">Login</Button>
          ) : (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{
                display: { xs: "block", sm: "block", md: "none" }, // Show on xs, sm, hide on md
                ml: 2,
              }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 } }}
          >
            <List>
              <ListItem button onClick={toggleDrawer}>
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TestHeader;
