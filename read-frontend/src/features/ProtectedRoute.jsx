import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../services/auth';

//Feature that checks users role before allowing access to protected routes
const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await apiClient.get('/users/role/'); // Get the user's role
        setUserRole(response.data.role);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserRole();
  }, []);

  if (isLoading) {
    return (<div>Loading...</div>); // Display loading state while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (allowedRoles.includes(userRole)) {
    return <Component />; // Render the component if the user has the right role
  }

  if (userRole=='reader'){
    return <Navigate to="/" />; // Redirect to home if the reader doesn't have the required role
  }
  if (userRole=='admin'){
    return <Navigate to="/admin" />; // Redirect to home if the admin doesn't have the required role
  }
 
  if (userRole=='teacher'){
    return <Navigate to="/teacher" />; // Redirect to home if the teacher doesn't have the required role
  }
};

export default ProtectedRoute;
