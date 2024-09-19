// Functions for uploading audio and getting pronunciation

import apiClient from './auth';

const baseUrl = "http://127.0.0.1:8000/";



export const uploadAudio = async (sessionId, audioFile, matchingText) => {
  try {
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('audio_file', audioFile);
    formData.append('matching_text', matchingText);

    const response = await apiClient.post(`${baseUrl}match-audio/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.match;
  } catch (error) {
    console.error('Error uploading audio file:', error);
  }
};


export const getPronunciation = async (text) => {
  try {
    const formData = new FormData();
    formData.append('mispronounced_text', text);

    const response = await apiClient.post(`${baseUrl}get-pronunciation/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  
    return response.data.correct_pronunciation;
  } catch (error) {
    console.error('Error getting pronunciation:', error);
    throw error;
  }
};