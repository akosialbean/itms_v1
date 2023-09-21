import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Image,
} from "react-bootstrap";
import { FaChartPie, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { PiDevicesFill } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
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
    <>
      <header>
        <Navbar
          bg="dark"
          variant="dark"
          expand="sm"
          className="fixed-top"
          collapseOnSelect
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <Image src="../it.png" rounded style={{ width: "45px" }} />
                ITMS
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" style={{ fontSize: "1.2rem" }}>
                {userInfo ? (
                  <>
                    <LinkContainer to="/">
                      <Nav.Link>
                        <FaChartPie /> Dashboard
                      </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/devices">
                      <Nav.Link>
                        <PiDevicesFill /> Devices
                      </Nav.Link>
                    </LinkContainer>

                    {/* //DROPDOWN LINKS */}
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/register">
                        <NavDropdown.Item>Add new User</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={handleLogout} className="text-danger">
                        <RxExit />
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <FaSignInAlt /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
