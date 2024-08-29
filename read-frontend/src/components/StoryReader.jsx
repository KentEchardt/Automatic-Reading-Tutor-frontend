import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';
import { IoMicSharp, IoMicOffSharp } from 'react-icons/io5';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { getStoryById, uploadAudio } from '../services/Stories';

const StoryReader = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const boxRef = useRef(null);
  const sentenceRefs = useRef([]);

  // Fetch story data
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await getStoryById(storyId);
        setStory(response);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [storyId]);

  // Scroll to current sentence
  useEffect(() => {
    if (boxRef.current && sentenceRefs.current[currentSentenceIndex]) {
      const container = boxRef.current;
      const currentSentence = sentenceRefs.current[currentSentenceIndex];
      container.scrollTop = currentSentence.offsetTop - container.offsetTop;
    }
  }, [currentSentenceIndex]);

  // Reset view on component mount
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
      setCurrentSentenceIndex(0);
    }
  }, [story]);

  if (!story) {
    return <p>Story not found.</p>;
  }

  const sentences = story.fulltext.split('. ').map(sentence => sentence.trim());

  const highlightedText = sentences.map((sentence, index) => (
    <span
      key={index}
      ref={(el) => (sentenceRefs.current[index] = el)}
      style={{
        color: index === currentSentenceIndex ? 'yellow' : 'inherit',
        display: 'block',
        paddingBottom: '10px',
      }}
    >
      {sentence + (index !== sentences.length - 1 ? '. ' : '')}
    </span>
  ));

  const handleNextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        
        recorder.ondataavailable = async (e) => {
          // Ensure this handler is set, but actual upload happens in handleStopRecording
          if (e.data.size > 0) {
            const recordedBlob = new Blob([e.data], { type: 'audio/webm' });
            // You might want to store the recordedBlob in state or a ref here if needed
          }
        };
  
        recorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorder) {
      // Set up ondataavailable handler before stopping the recorder
      mediaRecorder.ondataavailable = async (e) => {
        if (e.data.size > 0) {
          const recordedBlob = new Blob([e.data], { type: 'audio/webm' });
  
          setIsUploading(true);
          try {
            const isMatch = await uploadAudio("1", recordedBlob, sentences[currentSentenceIndex]);
  
            if (isMatch) {
              // Move to the next sentence if the audio matches
              if (currentSentenceIndex < sentences.length - 1) {
                setCurrentSentenceIndex(currentSentenceIndex + 1);
              }
            } else {
              // Show alert if the pronunciation was incorrect
              alert('Pronunciation was incorrect. Please try again.');
            }
          } catch (error) {
            console.error('Upload failed', error);
          } finally {
            setIsUploading(false);
          }
        }
      };
  
      try {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
          mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop all tracks
          
          // Request data if not already available
          // if (mediaRecorder.requestData) {
          //   mediaRecorder.requestData();
          // }
        } else if (mediaRecorder.state === 'inactive') {
          console.warn('MediaRecorder is inactive.');
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };
  
  
  return (
    <div>
      <HeaderComponent />
      <div style={{ backgroundColor: 'black', color: 'white' }}>
        <Container style={{ paddingTop: '10cqh', paddingBottom: '10cqh' }}>
          <Row>
            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Container
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  minHeight: '80cqh',
                }}
              >
                <div
                  style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    width: '50cqw',
                    boxSizing: 'border-box',
                    maxHeight: '70cqh',
                    overflowY: 'auto',
                  }}
                  ref={boxRef}
                >
                  <h1>{story.title}</h1>
                  <p>{story.description}</p>
                  <div style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    {highlightedText}
                  </div>
                </div>
              </Container>
            </Col>
            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
              <Button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                variant="primary"
                style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disabled={isUploading}
              >
                {isRecording ? (
                  <IoMicOffSharp size={24} />
                ) : (
                  <IoMicSharp size={24} />
                )}
                {isUploading && <div className="spinner-border spinner-border-sm ml-2" role="status" />}
              </Button>
              <Button onClick={handlePreviousSentence} variant="secondary" style={{ marginBottom: '10px' }}>
                Previous
              </Button>
              <Button onClick={() => setCurrentSentenceIndex(0)} variant="secondary">
                Start
              </Button>
              {isRecording && (
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  width={200}
                  height={75}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StoryReader;
 