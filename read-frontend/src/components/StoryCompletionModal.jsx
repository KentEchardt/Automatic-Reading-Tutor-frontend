import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';

const StoryCompletionModal = ({ show, onHide, stats }) => {
  const { initialReadingLevel, newReadingLevel, totalReadingTime, progress, errors } = stats;
  const [animatedLevel, setAnimatedLevel] = useState(initialReadingLevel);
  
  // Animate the progress bar/circle from initialReadingLevel to newReadingLevel
  useEffect(() => {
    if (show) {
      let level = initialReadingLevel;
      const interval = setInterval(() => {
        if (level < newReadingLevel) {
          level += 1;
          setAnimatedLevel(level);
        } else {
          clearInterval(interval);
        }
      }, 5); // Adjust speed here
      return () => clearInterval(interval);
    }
  }, [show, initialReadingLevel, newReadingLevel]);

  // Convert reading level to letter grade
  const getLetterGrade = (level) => {
    if (level < 100) return 'D';
    if (level < 200) return 'C';
    if (level < 300) return 'B';
    if (level < 400) return 'A';
    if (level < 500) return 'S';
    return 'D';
  };

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
            label={`${animatedLevel} / 500`} 
            animated
          />
          <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
            New Level: {newReadingLevel} ({getLetterGrade(newReadingLevel)})
          </div>
        </div>
        <h5>Statistics</h5>
        <p>Total Reading Time: {totalReadingTime} seconds</p>
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
