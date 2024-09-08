import axios from 'axios';
import apiClient from './auth';

const baseUrl = "http://127.0.0.1:8000/"; 

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}users/`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    return []; 
  }
};

// Get users by role (admins, teachers, readers)
export const getUsersByRole = async (role) => {
  try {
    const response = await apiClient.get(`${baseUrl}users/${role}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting users by role:', error);
    return [];
  }
};

// Get user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await apiClient.get(`${baseUrl}users/by-username/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user by username:', error);
    return null; 
  }
};

// Create a new user (requires appropriate authorization) – keeping axios for this case
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}users/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    return error; 
  }
};

// Check if user exists (for registration)
export const getUserExists = async (username) => {
  try {
    const response = await axios.get(`${baseUrl}users/check-username/${username}/`);
    return response.data.exists;
  } catch (error) {
    console.error('Error getting user by username:', error);
    return null; 
  }
};


// Get user's username using their token
export const getUsername = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}users/username/`);
    return response.data.username;
  } catch (error) {
    console.error('Error getting username:', error);
    return []; 
  }
};


// Get user's username using their token
export const getReadingLevel = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}users/readinglevel/`);
    return response.data.reading_level;
  } catch (error) {
    console.error('Error getting reading level:', error);
    return []; 
  }
};



