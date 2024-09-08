import apiClient from './auth';

const baseUrl = "http://127.0.0.1:8000/"; 

// Get all reading sessions
export const getAllReadingSessions = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}readingsessions/`);
    return response.data;
  } catch (error) {
    console.error('Error getting reading sessions:', error);
    return [];
  }
};

// Get a user's reading session for a specific story
export const getUserStorySession = async (userId, storyId) => {
  try {
    const response = await apiClient.get(`${baseUrl}readingsessions/by-user/${userId}/story/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user story session:', error);
    return null;
  }
};

// Create a new reading session (keeping axios)
export const createReadingSession = async (sessionData) => {
  try {
    const response = await axios.post(`${baseUrl}readingsessions/`, sessionData);
    return response.data;
  } catch (error) {
    console.error('Error creating reading session:', error);
    return null; 
  }
};


// Get user's total stories read using their token
export const getTotalStoriesRead = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}readingsessions/total-stories-read/`);
    return response.data.total_stories_read;
  } catch (error) {
    console.error('Error getting total stories read:', error);
    return []; 
  }
};

// Get user's most recent story using their token
export const getMostRecentStory = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}readingsessions/most-recent-story/`);
    return response.data;
  } catch (error) {
    console.error('Error getting most recent story:', error);
    return []; 
  }
};