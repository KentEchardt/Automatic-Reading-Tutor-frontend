import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Row, Container } from 'react-bootstrap';
import { IoMicSharp, IoMicOffSharp } from 'react-icons/io5';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { RiSpeakLine } from "react-icons/ri";
import { getPronunciation } from '../services/audio';

//Component for assisting user with word pronunciation
const PronunciationModal = ({ show, onHide, sentence, onAudioUpload }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [synth, setSynth] = useState(window.speechSynthesis);
  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state for uploading
  const [pronunciation, setPronunciation] = useState("Pronunciation")

  useEffect(()=>{
    if (sentence) {
      getPronunciation(sentence).then((response)=>{
        setPronunciation(response)
      }).catch((error)=>{
        console.error(error)
      });
    }
  }, [sentence])

  useEffect(() => {
    if (synth) {
      const voices = synth.getVoices();
      const utter = new SpeechSynthesisUtterance(sentence);
      utter.voice = voices.find(voice => voice.name === 'Google UK English Female'); // Select desired voice
      utter.rate = 1; // Adjust rate
      utter.pitch = 1; // Adjust pitch

      // Handle speech start/stop events
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);

      setUtterance(utter);
    }
  }, [synth, sentence]);

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      synth.cancel(); // Stop current speech if any
    }
    if (utterance) {
      synth.speak(utterance); // Restart the speech
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
            setIsUploading(true); // Start uploading
            await onAudioUpload(recordedBlob);
            setIsUploading(false); // End uploading
          }
        };

        recorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Pronounce the Sentence</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div>{pronunciation}</div>
            <div style={{ fontSize: '18px', marginTop: '10px' }}>{sentence}</div>
          </div>
        </div>
    
        <Container>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button
                onClick={handleSpeakToggle}
                variant="primary"
                style={{ marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <RiSpeakLine size={24} />
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                variant="secondary"
                style={{ marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disabled={isUploading} // Disable button while uploading
              >
                {isRecording ? (
                  <IoMicOffSharp size={24} />
                ) : (
                  <IoMicSharp size={24} />
                )}
                {isUploading && <div className="spinner-border spinner-border-sm ml-2" role="status" />}
              </Button>
            </Col>
          </Row>
          {isRecording && (
            <Row className="justify-content-center">
              <Col xs="auto">
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  width={200}
                  height={75}
                />
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PronunciationModal;
