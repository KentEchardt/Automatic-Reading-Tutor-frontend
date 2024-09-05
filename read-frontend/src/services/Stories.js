import apiClient from './auth';

const baseUrl = "http://127.0.0.1:8000/";

// Get all stories
export const getAllStories = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/`);
    return response.data;
  } catch (error) {
    console.error('Error getting stories:', error);
    return [];
  }
};

// Get a specific story by ID
export const getStoryById = async (storyId) => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/${storyId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting story by ID:', error);
    return null;
  }
};

// Create a new story (keeping axios)
export const createStory = async (storyData) => {
  try {
    const response = await axios.post(`${baseUrl}stories/`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    return null; 
  }
};

// Get all story listings
export const getStoryListings = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/get_story_listings/`);
    return response.data;
  } catch (error) {
    console.error('Error getting story listings:', error);
    return [];
  }
};

// Get a specific story cover by ID
export const getStoryCover = async (storyId) => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/${storyId}/get_story_cover/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting story by ID:', error);
    return null;
  }
};
