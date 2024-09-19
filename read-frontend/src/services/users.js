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



// Get all reader users
export const getReaders = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}users/readers/`);
    return response.data;
  } catch (error) {
    console.error('Error getting readers:', error);
    return []; 
  }
};

// Get all Teacher users
export const getTeachers= async () => {
  try {
    const response = await apiClient.get(`${baseUrl}users/teachers/`);
    return response.data;
  } catch (error) {
    console.error('Error getting teachers:', error);
    return []; 
  }
};

// Get all admin users
export const getAdmins = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}users/admins/`);
    return response.data;
  } catch (error) {
    console.error('Error getting admins:', error);
    return []; 
  }
};


export const deleteUser = async(userId) =>{
  try {
    const response = await apiClient.delete(`${baseUrl}/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    return [];
  }
}

export const getAverageReadingDuration = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/users/average_reading_duration/`);
    return response.data.average_duration;
  } catch (error) {
    console.error('Error fetching average reading duration:', error);
    return null;
  }
};

export const getAverageProgress = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/users/average_progress/`);
    return response.data.average_progress;
  } catch (error) {
    console.error('Error fetching average progress:', error);
    return null;
  }
};

export const getAverageReadingLevel = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/users/average_reading_level/`);
    return response.data.average_reading_level;
  } catch (error) {
    console.error('Error fetching average reading level:', error);
    return null;
  }
};

export const getAverageTimeToComplete = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/users/average_time_to_complete/`);
    return response.data.average_time_to_complete;
  } catch (error) {
    console.error('Error fetching average time to complete:', error);
    return null;
  }
};

