import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';
import { IoMicSharp, IoMicOffSharp } from 'react-icons/io5';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { uploadAudio } from '../services/Stories'; 


const StoryReader = () => {
  const dummydata = {
    stories: [
      {
        id: "1",
        title: "The Lost Puppy",
        description: "A heartwarming tale of a puppy finding its way home.",
        difficulty: "easy",
        image: "images/puppy.jpeg",
        fulltext: `
On a bright and sunny morning, a little puppy named Max woke up full of energy. Max was a fluffy golden retriever with the softest fur and the most curious eyes. He lived with his family in a cozy house at the end of Maple Street.

Every day, Max loved to play in the backyard, chasing butterflies and rolling around in the grass. But today, something felt different. As he bounded out of the house, a butterfly fluttered by, and Max couldn't resist the urge to follow it. The butterfly danced on the breeze, leading Max further and further away from his home.

Max followed the butterfly past the big oak tree, through the tall grass, and over a little hill. He was having so much fun that he didn't notice how far he'd gone. When the butterfly finally flew away, Max looked around and realized he was all alone. The houses, trees, and streets around him were unfamiliar.

Max felt a pang of worry. He was lost!

He wandered around, trying to find his way back, but everything looked different. He missed his family, his bed, and his favorite toys. As the day went on, Max grew tired and hungry. His little legs were sore from walking, and he wished he had never left his backyard.

Just as Max was about to give up, he heard a familiar sound. It was the voice of a little girl calling out, "Max! Max, where are you?"

Max's ears perked up. He knew that voice! It was Emma, his best friend and the girl who loved him most. Max barked as loud as he could and ran towards the sound.

Emma had been searching for Max all afternoon. She was so worried when she couldn't find him in the backyard. She called and called, hoping that Max would hear her. And when she finally heard his bark, her heart leapt with joy.

"Max!" Emma cried out as she saw him running towards her. She knelt down, and Max leaped into her arms, covering her face with happy puppy kisses.

Emma hugged Max tightly. "Oh, Max, I was so worried! Let's go home."

With Max safely in her arms, Emma carried him all the way back to their house on Maple Street. As soon as they got home, Max curled up in his favorite spot and fell fast asleep, dreaming of his adventure but happy to be home.

From that day on, Max never wandered too far from home again. He knew that his family was always there, ready to love and protect him. And whenever he saw a butterfly, he wagged his tail, remembering the day he got lost—and found his way back to the people who loved him.`,
      },
    ],
  };

  const { storyId } = useParams();
  const story = dummydata.stories.find(story => story.id === storyId);

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const boxRef = useRef(null);
  const sentenceRefs = useRef([]);

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

  const handleStartFromBeginning = () => {
    setCurrentSentenceIndex(0);
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
            // Uncomment for actual API call
            // setIsUploading(true);
            // try {
            //   await uploadAudio(recordedBlob, sentences[currentSentenceIndex]);
            // } catch (error) {
            //   console.error('Upload failed', error);
            // } finally {
            //   setIsUploading(false);
            // }
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
      mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop all tracks
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
      handleStartFromBeginning();
    }
  }, []);

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
              <Button onClick={handleStartFromBeginning} variant="secondary">
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
