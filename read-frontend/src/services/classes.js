import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/'; // Replace with your API base URL

// Get all classes
export const getAllClasses = async () => {
  try {
    const response = await axios.get(`${baseUrl}classes/`);
    return response.data;
  } catch (error) {
    console.error('Error getting classes:', error);
    return [];
  }
};

// (Optional) Get a specific class by ID (if your API supports it)
export const getClassById = async (classId) => {
  try {
    const response = await axios.get(`<span class="math-inline">\{baseUrl\}classes/</span>{classId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting class by ID');}
  }

  // Create a new class (requires appropriate authorization)
export const createClass = async (classData) => {
    try {
      const response = await axios.post(`${baseUrl}classes/`, classData);
      return response.data;
    } catch (error) {
      console.error('Error creating class:', error);
      return null; 
    }
  };
  