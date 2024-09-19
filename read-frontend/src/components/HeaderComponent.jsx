import React, { useEffect, useState } from 'react'
import {Container, Dropdown, Nav, Navbar, Modal,Form, Button} from 'react-bootstrap'
import { FiMenu } from "react-icons/fi";
import { BsPersonSquare } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { getUsername, getUserRole } from '../services/users';
import { joinClass } from '../services/students';


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
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [joinClassMessage, setJoinClassMessage] = useState("");
  const navigate = useNavigate();
  
   // Fetch username
   useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await getUsername();
        setUsername(response);
        const roleResponse = await getUserRole();
       
        setUserRole(roleResponse.role)
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

   
    
  
    fetchUsername();
  }, []);

  const handleSignOut = () => {
    // Clear tokens from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirect to login page 
    navigate('/login'); 
  };

  const handleJoinClass = async () => {
    try {
      const response = await joinClass(classCode);
      setJoinClassMessage(response.message);
      setClassCode("");
    } catch (error) {
      setJoinClassMessage("Error joining class. Please check the code.");
    }
  };

  return (
    <div className='custom-navbar-border'>
      <Navbar className="custom-navbar" expand="lg">
        <Container fluid>
          <Nav className="me-auto">
            <Dropdown className="d-inline">
              <Dropdown.Toggle as={HamburgerToggle} id="dropdown-autoclose-true"></Dropdown.Toggle>
              <Dropdown.Menu align={{ lg: 'end' }} style={{ right: 'auto', left: '0' }}>
                {userRole === 'reader' && (
                  <Dropdown.Item onClick={() => setShowJoinClassModal(true)}>Join Class</Dropdown.Item>
                )}
                <Dropdown.Item href="#">Settings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

          <Navbar.Brand href="/" className='justify-content-center mx-auto'>
            <img src="/images/ReadLogo.jpeg" className="d-inline-block align-top navbar-logo" alt="Logo" />
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Dropdown className="d-inline">
              <Dropdown.Toggle as={ProfileToggle} id="dropdown-autoclose-true"></Dropdown.Toggle>
              <Dropdown.Menu align={{ lg: 'end' }} style={{ right: '0', left: 'auto' }}>
                <Dropdown.Item href="/profile">{username}</Dropdown.Item>
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Join Class Modal */}
      <Modal show={showJoinClassModal} onHide={() => setShowJoinClassModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Class Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Class Code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
            </Form.Group>
            {joinClassMessage && <p>{joinClassMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJoinClassModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleJoinClass}>
            Join Class
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default HeaderComponent