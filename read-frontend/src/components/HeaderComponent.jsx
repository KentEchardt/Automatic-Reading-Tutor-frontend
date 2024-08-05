import React from 'react'
import {Container, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { FiMenu } from "react-icons/fi";



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
    <Container className= 'text-center' style={{display:"flex", flexDirection:'row',justifyContent:'flex-end', alignItems:'baseline'}}><FiMenu /><h5 className='mx-2'>Menu</h5></Container>
  </a>
));

const HeaderComponent = () => {
  return (
    <div>
        <Navbar className='custom-navbar' expand="lg">
            <Navbar.Brand href='/'>
                <img src = "images/booklogo.jpg" className="d-inline-block align-top navbar-logo justify-content-left" alt="Logo"/>
            </Navbar.Brand>
            <Navbar.Collapse className='justify-content-center'>
              <Nav href="" className="mx-auto text-light text-center justify-content-center" style={{paddingRight:"2cqw"}}  ><h5>R.E.A.D - Automatic Reading Tutor</h5>
              </Nav>

            </Navbar.Collapse>

            <Nav>
          <Dropdown className="d-inline">
            <Dropdown.Toggle as={HamburgerToggle} id="dropdown-autoclose-true">
            </Dropdown.Toggle>
            <Dropdown.Menu align={{ lg: 'end' }} style={{ right: '0', left: 'auto' }}>
              <Dropdown.Item href="#">Contact Us</Dropdown.Item>
              <Dropdown.Item href="https://summerterraces.co.za/" target='_blank' rel='noopener noreferrer'>Main Website</Dropdown.Item>
              <Dropdown.Item href="#">Development Brochure</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
    
          </Nav>

        </Navbar>

        
    </div>
  )
}

export default HeaderComponent