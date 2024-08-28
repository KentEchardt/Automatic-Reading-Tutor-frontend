import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/"; 

// Get all reading sessions
export const getAllReadingSessions = async () => {
  try {
    const response = await axios.get(`${baseUrl}readingsessions/`);
    return response.data;
  } catch (error) {
    console.error('Error getting reading sessions:', error);
    return [];
  }
};

// Get a user's reading session for a specific story
export const getUserStorySession = async (userId, storyId) => {
  try {
    const response = await axios.get(`${baseUrl}readingsessions/by-user/${userId}/story/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user story session:', error);
    return null;
  }
};

// Create a new reading session (requires appropriate authorization)
export const createReadingSession = async (sessionData) => {
    try {
      const response = await axios.post(`${baseUrl}readingsessions/`, sessionData);
      return response.data;
    } catch (error) {
      console.error('Error creating reading session:', error);
      return null; 
    }
  };