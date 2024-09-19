import apiClient from './auth';

const baseUrl = "http://127.0.0.1:8000/"; 

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}students/`);
    return response.data;
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};

// Get a specific student by ID (optional)
export const getStudentById = async (studentId) => {
  try {
    const response = await apiClient.get(`${baseUrl}students/${studentId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    return null;
  }
};

export const joinClass = async (classCode) => {
  try {
    const response = await apiClient.post(`${baseUrl}students/join_class/`, { class_code: classCode });
    return response.data;
  } catch (error) {
    console.error("Error in joinClass API call:", error.response ? error.response.data : error);
    throw error;
  }
};