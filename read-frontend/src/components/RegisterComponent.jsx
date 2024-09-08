import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { createUser, getUserExists } from '../services/users'; 
import HeaderPlain from './HeaderPlain';


// Component for registering new users
const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Reader');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const validateForm = async(e)=> {
    let valid = true;
    const newErrors = {};
    const userExists = await UserExists(username);
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
      valid = false;
    } else if (!userExists){
        newErrors.username = 'Username already taken.'
        valid = false;
    } else {
      newErrors.username = '';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Invalid email format.';
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (!isValidPassword(password.trim())) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.';
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return valid;
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isValidPassword(password) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const user = { username, email, password, role:role.toLowerCase() };
      createUser(user)
        .then(() => {
          setUsername('');
          setEmail('');
          setPassword('');
          setRole('Reader');
          alert('Registration successful, please log in.');
          navigate('/login');
        })
        .catch((error) => {
          console.error('Registration error:', error);
        });
    }
  };

  return (
    <div>
      <HeaderPlain />

      <div className='' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <Container className="border registration-popup" style={{ width: '80%', maxWidth: '600px', backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Row className="justify-content-center">
            <Col>
              <h1>Register</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" style={{ marginBottom: '1.5rem' }}>
                  <Form.Label>Username</Form.Label>
                  {errors.username && <div className="text-danger mb-2">{errors.username}</div>}
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? 'is-invalid' : ''}
                  />
                </Form.Group>

                <Form.Group controlId="email" style={{ marginBottom: '1.5rem' }}>
                  <Form.Label>Email Address</Form.Label>
                  {errors.email && <div className="text-danger mb-2">{errors.email}</div>}
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'is-invalid' : ''}
                  />
                </Form.Group>

                <Form.Group controlId="password" style={{ marginBottom: '1.5rem' }}>
                  <Form.Label>Password</Form.Label>
                  {errors.password && <div className="text-danger mb-2">{errors.password}</div>}
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? 'is-invalid' : ''}
                    />
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="role" style={{ marginBottom: '1.5rem' }}>
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Reader">Reader</option>
                    <option value="Teacher">Teacher</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3" style={{ width: '100%' }}>
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegisterComponent;
