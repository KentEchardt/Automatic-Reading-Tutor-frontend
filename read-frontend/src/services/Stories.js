import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/"


export const uploadAudio = async (sessionId, audioFile) => {
  try {
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('audio_file', audioFile);

    const response = await axios.post(baseUrl+'match-audio/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error uploading audio file:', error);
  }
};


// Get all stories
export const getAllStories = async () => {
  try {
    const response = await axios.get(`${baseUrl}stories/`);
    return response.data;
  } catch (error) {
    console.error('Error getting stories:', error);
    return [];
  }
};

// Get a specific story by ID 
export const getStoryById = async (storyId) => {
  try {
    const response = await axios.get(`${baseUrl}stories/${storyId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting story by ID:', error);
    return null;
  }
};


// Create a new story (requires appropriate authorization)
export const createStory = async (storyData) => {
  try {
    const response = await axios.post(`${baseUrl}stories/`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    return null; 
  }
};


