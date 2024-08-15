import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { uploadAudio } from '../services/Stories';

const DemoTest = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (audioFile) {
      uploadAudio(1, audioFile).then((response) => {
        // Convert response data to a string for better readability in the alert
        alert(JSON.stringify(response.data, null, 2));
      }).catch((error) => {
        // Handle any errors
        alert('Error uploading audio file.');
        console.error('Error:', error);
      });
    } else {
      alert('Please select an audio file to upload.');
    }
  };
  

  return (
    <div style={{height:'100vh', justifyContent:'center', alignItems:'center', display:'flex'}} className='container'>
    <Container style={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className='demo-border'>
      <Row style={{marginBottom:'3cqh'}}>
        <h3>Sentence: The quick brown fox jumped over the lazy dog.</h3>
      </Row>

      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select an audio file to upload</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" style={{marginTop:'3cqh'}} onClick={handleUpload}>
              Upload and Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default DemoTest;
