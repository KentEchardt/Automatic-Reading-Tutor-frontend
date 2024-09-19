import axios from 'axios';
import apiClient from './auth';

const baseUrl = "http://127.0.0.1:8000/";


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
    const response = await apiClient.post(`${baseUrl}stories/`, storyData);
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

// Get all stories
export const getAllStories = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/get_stories/`);
    return response.data;
  } catch (error) {
    console.error('Error getting stories:', error);
    return [];
  }
};

// Get easy stories
export const getEasyStories = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/get_easy_stories/`);
    return response.data;
  } catch (error) {
    console.error('Error getting easy stories:', error);
    return [];
  }
};

// Get meidum stories
export const getMediumStories = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/get_medium_stories/`);
    return response.data;
  } catch (error) {
    console.error('Error getting medium stories:', error);
    return [];
  }
};

// Get easy stories
export const getHardStories = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}stories/get_hard_stories/`);
    return response.data;
  } catch (error) {
    console.error('Error getting hard stories:', error);
    return [];
  }
};

export const deleteStory = async(storyId) =>{
  try {
    const response = await apiClient.delete(`${baseUrl}/stories/${storyId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting story:', error);
    return [];
  }
}


export const getMostPopularStory = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/stories/most_popular/`);
    return {
      story: response.data,
      sessionCount: response.data.session_count
    };
  } catch (error) {
    console.error('Error fetching most popular story:', error);
    return null;
  }
};

export const getLeastPopularStory = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/stories/least_popular/`);
    return {
      story: response.data,
      sessionCount: response.data.session_count
    };
  } catch (error) {
    console.error('Error fetching least popular story:', error);
    return null;
  }
};

export const getMostEngagedStory = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/stories/most_engaged/`);
    return {
      story: response.data,
      totalEngagement: response.data.total_engagement
    };
  } catch (error) {
    console.error('Error fetching most engaged story:', error);
    return null;
  }
};

export const getCurrentStories = async () => {
  try {
    const response = await apiClient.get(`${baseUrl}/stories/get_current_story_listings/`);
    return response.data;
  } catch (error) {
    console.error('Error getting current stories:', error);
    return [];
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

// Update story service
export const updateStory = async (storyId, formData) => {
  try {
      const response = await apiClient.put(`${baseUrl}stories/${storyId}/update_story/`, formData);
      return response.data;
  } catch (error) {
      console.error('Error updating story:', error);
      throw error;
  }
};