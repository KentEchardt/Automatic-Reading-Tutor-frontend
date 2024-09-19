import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';
import { IoMicSharp, IoMicOffSharp } from 'react-icons/io5';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { getStoryById } from '../services/Stories';
import { uploadAudio } from '../services/audio';
import PronunciationModal from './PronunciationModal';
import { startSession, endSession, pauseSession, getProgress, getPosition, previousSentence, getStats } from '../services/readingsession';
import StoryCompletionModal from './StoryCompletionModal';

const StoryReader = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [incorrectPronunciation, setIncorrectPronunciation] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [progress,setProgress] = useState(0)
  const [sentences, setSentences] = useState([])
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [showCompleteButton, setShowCompleteButton] = useState(false)
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(0);
  const boxRef = useRef(null);
  const sentenceRefs = useRef([]);
  const navigate = useNavigate();



   const initializeSession = async () => {
      try {
        const response = await startSession(storyId);
        setSessionId(response);
        startTimeRef.current = Date.now();
        accumulatedTimeRef.current = 0;
      } catch (error) {
        console.error('Error starting session:', error);
      }
    };

  // Fetch the story and start the session when the component mounts
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
    initializeSession();

    return () => {
      stopTimerAndPauseSession();
    };
  }, [storyId]);

  useEffect(() => {
    if (story) {
      const fullText = story.fulltext;
  
      // Split by sentences using a regex that captures the sentence-ending punctuation
      const parsedSentences = fullText.match(/[^.!?]*[.!?](\s|$)/g);
  
      // Check if the parsed sentences match the length of the full text
      const parsedText = parsedSentences ? parsedSentences.join('') : '';
  
      // Set the sentences to state
      setSentences(parsedSentences);
    }
  }, [story]);
  
  

  const fetchProgressAndPosition = async () => {
    if (sessionId && sentences.length > 0) {
      try {
        // Fetch the progress
        const progressResponse = await getProgress(sessionId);
        setProgress(progressResponse);

        if (progressResponse>=100){
          setShowCompleteButton(true)

        }else{
          setShowCompleteButton(false)
        }
        // Fetch the current character position
        const positionResponse = await getPosition(sessionId);
        const charPosition = positionResponse;

        // Find the sentence index based on the character position
        const sentenceIndex = getSentenceIndexFromPosition(charPosition, sentences);
   
        
        setCurrentSentenceIndex(sentenceIndex);
      } catch (error) {
        console.error('Error fetching progress and position:', error);
      }
    }
  };
// Effect to fetch progress and position after sentences have been set
useEffect(() => {

  fetchProgressAndPosition();
}, [sessionId, sentences]);

  const getSentenceIndexFromPosition = (charPosition, sentences) => {
    let totalChars = 0;
    for (let i = 0; i < sentences.length; i++) {
      totalChars += sentences[i].length;
      if (charPosition < totalChars) {
  
        return i;
      }
    }
    return 0;  // Default to first sentence if something goes wrong
  };


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimerAndPauseSession();
      } else {
        startTimeRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId]);

 
  const calculateElapsedTime = () => {
    if (startTimeRef.current) {
      const now = Date.now();
      const elapsedSinceStart = Math.floor((now - startTimeRef.current) / 1000);
      return accumulatedTimeRef.current + elapsedSinceStart;
    }
    return accumulatedTimeRef.current;
  };


  const stopTimerAndPauseSession = async () => {
    if (sessionId && startTimeRef.current) {
      const elapsedTime = calculateElapsedTime();
      accumulatedTimeRef.current = elapsedTime;
      startTimeRef.current = null;

      try {
        await pauseSession(sessionId, elapsedTime);
      } catch (error) {
        console.error('Error pausing session:', error);
      }
    }
  };

  const handleCompleteStory = async () => {
    if (sessionId) {
      const finalTime = calculateElapsedTime();
      try {
        const response = await endSession(sessionId, finalTime);
        setSessionId(null);
        accumulatedTimeRef.current = 0;
        startTimeRef.current = null;
        navigate("/");
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
  };


  



  useEffect(() => {
    if (boxRef.current && sentenceRefs.current[currentSentenceIndex]) {
      const container = boxRef.current;
      const currentSentence = sentenceRefs.current[currentSentenceIndex];
      container.scrollTop = currentSentence.offsetTop - container.offsetTop;
    }
  }, [currentSentenceIndex]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
      setCurrentSentenceIndex(0);
    }
  }, [story]);

  if (!story) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white' }}>
        <HeaderComponent />
        <div style={{ paddingTop: '40cqh', paddingBottom: '40cqh', textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }



  const handleSentenceClick = (index) => {
    setSelectedSentence(sentences[index]);
    setShowModal(true);
  };

  const highlightedText = sentences.map((sentence, index) => (
    <span
      key={index}
      ref={(el) => (sentenceRefs.current[index] = el)}
      style={{
        color: index === currentSentenceIndex ? 'yellow' : 'inherit',
        display: 'block',
        paddingBottom: '10px',
        cursor: incorrectPronunciation && index === currentSentenceIndex ? 'pointer' : 'text',
      }}
      onClick={() => incorrectPronunciation && index === currentSentenceIndex && handleSentenceClick(index)}
    >
      {sentence}
    </span>
  ));

  const handlePreviousSentence = async () => {
    if (currentSentenceIndex > 0) {
      try {
        await previousSentence(sessionId, sentences[currentSentenceIndex - 1]);
        await fetchProgressAndPosition();
      } catch (error) {
        console.error('Error handling previous sentence:', error);
        // Add user feedback here, e.g., toast notification
      }
    }
  };

  const handleNextSentence = async () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);

      try {
        const progressResponse = await getProgress(sessionId);
        setProgress(progressResponse);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    }
  };

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = async (e) => {
          if (e.data.size > 0) {
            const recordedBlob = new Blob([e.data], { type: 'audio/webm' });
          }
        };

        recorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const handleUpload = async (recordedBlob) => {
    try {
      const isMatch = await uploadAudio(sessionId, recordedBlob, sentences[currentSentenceIndex]);

      if (isMatch) {
        if (currentSentenceIndex < sentences.length - 1) {
          handleNextSentence();
          setIncorrectPronunciation(false);
          setShowModal(false);
        } else {
          // Show the "Complete Story" button when the last sentence is correct
          alert('Story completed successfully!');
          fetchProgressAndPosition();
        }
      } else {
        alert('Pronunciation was incorrect. Please try again.');
        setIncorrectPronunciation(true);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = async (e) => {
        if (e.data.size > 0) {
          const recordedBlob = new Blob([e.data], { type: 'audio/webm' });

          setIsUploading(true);
          handleUpload(recordedBlob);
        }
      };

      try {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
          mediaRecorder.stream.getTracks().forEach(track => track.stop());
        } else if (mediaRecorder.state === 'inactive') {
          console.warn('MediaRecorder is inactive.');
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };



  const handleStartNewSession = async () => {
    if (sessionId) {
      const elapsedTime = calculateElapsedTime();
      try{
      await endSession(sessionId, elapsedTime);
      await fetchProgressAndPosition(); 
      setSessionId(null);
      await initializeSession(); // Start a new session
      }
      catch (error) {
        console.error('Error starting new session:', error);
      }
      
    }

    
  };

  return (
    <div>
      <HeaderComponent />
      <div style={{ backgroundColor: 'black', color: 'white', paddingTop:'5cqh' }}>
        <ProgressBar variant='success' now={progress} animated  label={`${progress.toFixed(1)}%`} ></ProgressBar>
        <Container style={{ paddingTop: '5cqh', paddingBottom: '10cqh' }}>
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
              style={{ marginBottom: '2cqh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              disabled={isUploading || showCompleteButton}
            >
              {isRecording ? (
                <IoMicOffSharp size={24} />
              ) : (
                <IoMicSharp size={24} />
              )}
              {isUploading && <div className="spinner-border spinner-border-sm ml-2" role="status" />}
            </Button>
            <Button style={{ marginBottom: '2cqh'}} onClick={handlePreviousSentence} variant="secondary" disabled={currentSentenceIndex === 0}>
              Previous Sentence
            </Button>
            <Button style={{ marginBottom: '2cqh'}} onClick={handleStartNewSession} variant="secondary" disabled={currentSentenceIndex === 0 && progress<100}>
              Start from beginning
            </Button>
            {showCompleteButton && (
              <Button onClick={handleCompleteStory} variant="success" style={{ marginTop: '10px' }}>
                Complete Story
              </Button>
            )}
              {showCompleteButton && (
              <Button onClick={() => setShowCompletionModal(true)} variant="success" style={{ marginTop: '10px' }}>
                Show Stats
              </Button>
            )}
          </Col>
          </Row>
        </Container>
      </div>
      <PronunciationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        sentence={selectedSentence}
        onAudioUpload={handleUpload}
      />

        {/* Other StoryReader content */}
    <StoryCompletionModal
      show={showCompletionModal}
      onHide={() => setShowCompletionModal(false)}
      sessionId={sessionId} 
    />
    </div>
  );
};


export default StoryReader;
