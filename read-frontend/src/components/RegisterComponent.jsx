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


  async function userExists(username) {
    try {
      const response = await getUserExists(username);
  
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
      isValid = false;
    } else {
      const exists = await userExists(username);
      if (exists) {
        newErrors.username = 'Username already taken.';
        isValid = false;
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (!isValidPassword(password.trim())) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (isValid) {
      const user = { username, email, password, role: role.toLowerCase() };
      try {
        await createUser(user);
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('Reader');
        alert('Registration successful, please log in.');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }
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
                    <option value="Admin">Admin</option>
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
