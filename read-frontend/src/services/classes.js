// Functions for accessing class endpoints

import apiClient from './auth';

const baseUrl = 'http://localhost:8000/'; 


// Get a specific class by ID (optional)
export const getClassById = async (classId) => {
  try {
    const response = await apiClient.get(`${baseUrl}classes/${classId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting class by ID');
  }
};



// Function to create a new class
export const createClass = async () => {
  try {
    const response = await apiClient.post(`${baseUrl}classes/create_class/`, {}); // Add necessary payload if needed
    console.log('Class created:', response.data);
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

// Get all students
export const getStudents = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}classes/get_students/`);
    return response.data;
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};

// Get all students
export const getClasses = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}classes/get_classes/`);
    return response.data;
  } catch (error) {
    console.error('Error getting classes:', error);
    return [];
  }
};