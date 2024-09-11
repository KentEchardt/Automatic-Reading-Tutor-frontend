import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getStoryCover } from '../services/Stories';

// Component for displaying a Story in a circle
const StoryCircle = ( {story_id} ) => {
  
  const [storyTitle, setStoryTitle] = useState('') 
  const [storyImageData, setStoryImageData] = useState(null)
  const [contentType, setContentType] = useState(null)

  const base64ToImage = (base64String, contentType) => {
    return `data:${contentType};base64,${base64String}`;
  };

  // Fetch story cover data
  useEffect(() => {
    if (story_id) {
      const fetchStoryCover = async () => {
        try {
          const response = await getStoryCover(story_id);
          setStoryImageData(response.image_data);
          setStoryTitle(response.title);
          setContentType(response.contentType);
        } catch (error) {
          console.error('Error fetching story cover:', error);
        }
      };

      fetchStoryCover();
    }
  }, [story_id]);


  if (!story_id) {
    return (
      <div
        style={{
          width: '40cqh',
          height: '40cqh',
          borderRadius: '50%',
          backgroundColor: 'teal',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
      >
        <p style={{ margin: '8px', fontSize: '0.75rem' }}>Nothing to show</p>
      </div>
    );
  }

    
  
  

  return (
    <div
      style={{
        width: '40cqh',
        height: '40cqh',
        borderRadius: '50%',
        backgroundColor: 'teal',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s',
        cursor: 'pointer'
      }}
      className="story-circle"
    >
      <Image
        src={base64ToImage(storyImageData, contentType)}
        alt={storyTitle}
        style={{ width: '60%', height: '60%', borderRadius: '50%', objectFit: 'cover' }}
      />
      <p style={{ marginTop: '8px', fontSize: '0.75rem' }}>{storyTitle}</p>
    </div>
  );
};

export default StoryCircle;
