import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { getStats, pauseSession } from '../services/readingsession';

//Modal for displaying story completion statistics
const StoryCompletionModal = ({ show, onHide, sessionId }) => {
  const [stats, setStats] = useState(null);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  // Format seconds into hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Fetch stats when modal is shown
  useEffect(() => {
    const fetchStats = async () => {
      if (show && sessionId) {
        try {
          const statsResponse = await getStats(sessionId);
          
          setStats(statsResponse);

          // Start animating the progress bar when stats are fetched
          setAnimatedLevel(statsResponse.initial_reading_level);
          let level = statsResponse.initial_reading_level;
          const interval = setInterval(() => {
            if (level < statsResponse.new_reading_level) {
              level += 1;
              setAnimatedLevel(level);
            } else {
              clearInterval(interval);
            }
          }, 5); // Adjust speed here

          return () => clearInterval(interval);
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      }
    };

    fetchStats();
  }, [show, sessionId]);

  // Convert reading level to letter grade
  const getLetterGrade = (level) => {
    if (level < 100) return 'D';
    if (level < 200) return 'C';
    if (level < 300) return 'B';
    if (level < 400) return 'A';
    if (level < 500) return 'S';
    return 'D';
  };

  if (!stats) {
    return null; // Return null or a loading spinner while stats are being fetched
  }

  const initialReadingLevel = stats.initial_reading_level;
  const newReadingLevel = stats.new_reading_level;
  const totalReadingTime = stats.total_reading_time;
  const progress = stats.progress;
  const errors = stats.errors;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Story Completed!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Your Reading Progress</h4>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Initial Level: {initialReadingLevel} ({getLetterGrade(initialReadingLevel)})
          </div>
          <ProgressBar 
            now={(animatedLevel / 500) * 100} 
            animated
          />
          <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
            New Level: {newReadingLevel?.toFixed(2)} ({getLetterGrade(newReadingLevel)})
          </div>
        </div>
        <h5>Statistics</h5>
        <p>Total Reading Time: {formatTime(totalReadingTime)}</p>
        <p>Story Progress: {progress}%</p>
        <p>Total Errors: {errors}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-success" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoryCompletionModal;
