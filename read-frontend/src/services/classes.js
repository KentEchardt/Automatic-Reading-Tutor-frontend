import apiClient from './auth';

const baseUrl = 'http://localhost:8000/'; 

// Get all classes
export const getAllClasses = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}classes/`);
    return response.data;
  } catch (error) {
    console.error('Error getting classes:', error);
    return [];
  }
};

// Get a specific class by ID (optional)
export const getClassById = async (classId) => {
  try {
    const response = await apiClient.get(`${baseUrl}classes/${classId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting class by ID');
  }
};

// Create a new class (keeping axios)
export const createClass = async (classData) => {
  try {
    const response = await axios.post(`${baseUrl}classes/`, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    return null; 
  }
};
