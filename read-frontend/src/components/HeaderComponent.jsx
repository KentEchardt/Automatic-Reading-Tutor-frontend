import React from 'react'
import {Container, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { FiMenu } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";


// Defining the hamburger toggle for the hamburger menu
const HamburgerToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ textDecoration: 'none' }}
    className='text-white mx-2'
  >
    {children}
    <Container className= 'text-center' style={{display:"flex", flexDirection:'row',justifyContent:'flex-end', alignItems:'baseline'}}><FiMenu size={50} /></Container>
  </a>
));

// Defining the profile toggle for the profile menu
const ProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ textDecoration: 'none' }}
    className='text-white mx-2'
  >
    {children}
    <Container className= 'text-center' style={{display:"flex", flexDirection:'row',justifyContent:'flex-end', alignItems:'baseline'}}><BsPersonSquare size={50} /></Container> 
  </a>
));

//Component for displaying the main website header - to be displayed on most pages
const HeaderComponent = () => {
  return (
    <div className='custom-navbar-border' >
       <Navbar className="custom-navbar" expand="lg">
  <Container fluid>
    
    {/* Hamburger Menu  */}
    <Nav className="me-auto">
      <Dropdown className="d-inline">
        <Dropdown.Toggle as={HamburgerToggle} id="dropdown-autoclose-true">
        </Dropdown.Toggle>
        <Dropdown.Menu align={{ lg: 'end' }} style={{ right: 'auto', left: '0' }}>
        <Dropdown.Item href="#">Settings</Dropdown.Item>      
        </Dropdown.Menu>
      </Dropdown>
    </Nav>

    {/* Centered Logo */}
    <Navbar.Brand href="/" className='justify-content-center mx-auto' >
      <img src="/images/ReadLogo.jpeg" className="d-inline-block align-top navbar-logo" alt="Logo" />
    </Navbar.Brand>

    {/* Profile Menu */}
    <Nav className="ms-auto">
    <Dropdown className="d-inline"  >
        <Dropdown.Toggle as={ProfileToggle} id="dropdown-autoclose-true">
        </Dropdown.Toggle>
        <Dropdown.Menu align={{ lg: 'end' }} style={{ right: '0', left: 'auto' }} >
          <Dropdown.Item href="#">My Profile</Dropdown.Item>
          <Dropdown.Item >Sign Out</Dropdown.Item>
        </Dropdown.Menu>
            
          </Dropdown>

    </Nav>
  </Container>
</Navbar>




        
    </div>
  )
}

export default HeaderComponent