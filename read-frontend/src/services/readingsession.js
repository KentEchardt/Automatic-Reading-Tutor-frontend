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

export const startSession = async (story_id) => {
  try {
    const response = await apiClient.post(`${baseUrl}readingsessions/start-session/`, {
      story_id,
    });
    return response.data.session_id;
  } catch (error) {
    console.error('Error starting session:', error);
    return null; 
  }
};

export const endSession = async (session_id, time_reading) => {
  try {
    const response = await apiClient.post(`${baseUrl}readingsessions/end-session/`, {
      session_id,
      time_reading,
    });
    return response.data;
  } catch (error) {
    console.error('Error ending session:', error);
    return null; 
  }
};

export const pauseSession = async (session_id, time_reading) => {
  try {
    const response = await apiClient.post(`${baseUrl}readingsessions/pause-session/`, {
      session_id,
      time_reading,
    });
    return response.data;
  } catch (error) {
    console.error('Error pausing session:', error);
    return null; 
  }
};

// Get user's most recent story using their token
export const getProgress = async (session_id) => {
  try {
    const response = await apiClient.get(`${baseUrl}readingsessions/progress/`, {
      params: { session_id }  // Pass session_id as query parameter
    });
    return response.data.progress;
  } catch (error) {
    console.error('Error getting progress:', error);
    return null; // Return null in case of an error
  }
};

// Get user's most recent story using their token
export const getPosition = async (session_id) => {
  try {
    const response = await apiClient.get(`${baseUrl}readingsessions/current_position/`, {
      params: { session_id }  // Pass session_id as query parameter
    });
    return response.data.current_position;
  } catch (error) {
    console.error('Error getting current position:', error);
    return null; // Return null in case of an error
  }
};