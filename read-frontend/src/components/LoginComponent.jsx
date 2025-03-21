import React, { useState,  } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import HeaderComponent from './HeaderComponent';
import { useNavigate } from 'react-router-dom';
import HeaderPlain from './HeaderPlain';
import { login } from '../services/auth';
import { getUserExists } from '../services/users';


//Component for allowing a User to log in
const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
    const navigator = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };


  function UserExists(username) {
    return getUserExists(username)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return false; // Return false in case of an error
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userExists = await UserExists(username);
    if (userExists) {
      try {
        const response = await login(username, password);
        console.log(response);
        
        if (response) {
          // On successful login, navigate to home or another page
          navigator('/');
        } else {
          // Handle error (e.g., show error message)
          alert('Login failed. Please check your username and password.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Password Incorrect.');
      }
    } else {
      console.log("User does not exist.");
    }
  };

  
  return (
    <div>
        <HeaderPlain/>
    
    <div className='' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' , backgroundColor:'black'}}>
      <Container className='border login-popup' style={{ width: '80%', maxWidth: '600px', backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Row className="justify-content-center align-items-center">
          {/* Logo Section */}
          {/* <Col xs={12} className="text-center" style={{ marginBottom: '2rem' }}>
            <img src="/images/ReadLogo.jpeg" alt="Logo" style={{ maxHeight: '30%' }} />
          </Col> */}

          {/* Form Section */}
          <Col xs={12}>
            <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h1>
            <Form>
              <Form.Group controlId="username" style={{ marginBottom: '1.5rem' }}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="password" style={{ marginBottom: '1.5rem' }}>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
          
              <Button variant="primary" onClick={handleSubmit} style={{ width: '100%' }}>Login</Button>
              <Form.Group style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Form.Label>
                  <a href="/register">Don't have an account? Click to Register...</a>
                </Form.Label>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default LoginComponent;
