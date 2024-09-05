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

    console.log('Response:', response.data);
    return response.data.match;
  } catch (error) {
    console.error('Error uploading audio file:', error);
  }
};
