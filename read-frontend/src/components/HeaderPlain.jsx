import React from 'react'
import {Container, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { FiMenu } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";


const HeaderPlain = () => {
  return (
    <div className='custom-navbar-border' >
    <Navbar className="custom-navbar" expand="lg">
<Container fluid>
 {/* Centered Logo */}
 <Navbar.Brand href="/login" className='justify-content-center mx-auto' >
   <img src="images/ReadLogo.jpeg" className="d-inline-block align-top navbar-logo" alt="Logo" />
 </Navbar.Brand>
</Container>
</Navbar>




     
 </div>
  )
}

export default HeaderPlain