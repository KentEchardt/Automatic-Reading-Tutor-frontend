import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/"; // Replace with your API base URL

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${baseUrl}students/`);
    return response.data;
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};

// (Optional) Get a specific student by ID (if your API supports it)
export const getStudentById = async (studentId) => {
  try {
    const response = await axios.get(`${baseUrl}students/${studentId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    return null;
  }
};

// Create a new student (requires appropriate authorization)
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${baseUrl}students/`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    return null; // Handle errors gracefully
  }
};