import React from 'react';
import { Image } from 'react-bootstrap';

// Component for displaying a Story in a circle
const StoryCircle = ({ story }) => {
  if (!story || !story.image || !story.title) {
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
        src={story.image}
        alt={story.title}
        style={{ width: '60%', height: '60%', borderRadius: '50%', objectFit: 'cover' }}
      />
      <p style={{ marginTop: '8px', fontSize: '0.75rem' }}>{story.title}</p>
    </div>
  );
};

export default StoryCircle;
