import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getStoryCover } from '../services/Stories';
import { useNavigate } from 'react-router-dom';
import { getStoryProgress } from '../services/readingsession';

// Component for displaying a Story in a circle
const StoryCircle = ({ story_id }) => {
  const [storyTitle, setStoryTitle] = useState(''); 
  const [storyImageData, setStoryImageData] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const navigate = useNavigate();

  const base64ToImage = (base64String, contentType) => {
    return `data:${contentType};base64,${base64String}`;
  };

  const handleClick = () => {
    navigate(`/story/${story_id}`);
  };

  // Fetch story cover data and progress
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

      const fetchStoryProgress = async () => {
        try {
          const response = await getStoryProgress(story_id);
          setStoryProgress(response);

        } catch (error) {
          console.error('Error fetching story progress:', error);
        }
      };

      fetchStoryCover();
      fetchStoryProgress();
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
        position: 'relative',
        backgroundColor: 'teal',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s',
        cursor: 'pointer',
      }}
      className="story-circle"
      onClick={handleClick}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 36 36"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)',
        }}
      >
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke="#d3d3d3" // Light gray background circle (full border)
          strokeWidth="2.5"
        />
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke="turquoise" // Progress stroke color
          strokeWidth="2.5"
          strokeDasharray={`${storyProgress}, 100`} // Calculate progress
          strokeDashoffset="0"
        />
      </svg>
      <Image
        src={base64ToImage(storyImageData, contentType)}
        alt={storyTitle}
        style={{ width: '60%', height: '60%', borderRadius: '50%', objectFit: 'cover', zIndex: 1 }}
      />
      <p style={{ marginTop: '8px', fontSize: '0.75rem', zIndex: 1 }}>{storyTitle}</p>
    </div>
  );
};

export default StoryCircle;
