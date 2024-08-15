import axios from 'axios';

const REST_API_BASE_URL = "http://127.0.0.1:8000"


export const uploadAudio = async (sessionId, audioFile) => {
  try {
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('audio_file', audioFile);

    const response = await axios.post(REST_API_BASE_URL+'/match-audio/', formData, {
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


