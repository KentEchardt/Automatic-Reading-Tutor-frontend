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

// Create a new student (keeping axios)
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${baseUrl}students/`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    return null; 
  }
};

