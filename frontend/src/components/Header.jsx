import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap'
import {FaChartPie, FaLaptopHouse, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const handleLogout = async () => {
        try{
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
        <header>
            <Navbar bg='dark' variant='dark' expand='sm' className='fixed-top' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ITMS</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            { userInfo ? (
                                <>
                                    <LinkContainer to='/'>
                                        <Nav.Link>
                                            <FaChartPie /> Dashboard
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to='/devices'>
                                        <Nav.Link>
                                            <FaLaptopHouse /> Devices
                                        </Nav.Link>
                                    </LinkContainer>

                                    {/* //DROPDOWN LINKS */}
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={handleLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to='/register'>
                                        <Nav.Link>
                                            <FaSignOutAlt /> Sign Up
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
  )
}

export default Header