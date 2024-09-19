import React, { useEffect, useState } from 'react';
import { deleteStory, getAllStories, getEasyStories, getHardStories, getMediumStories } from '../services/Stories';
import { Container, Table, Button } from 'react-bootstrap';
import AddStoryComponent from './AddStoryComponent';

const StoryTable = ({ storyType }) => {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        getStories();
        setSelectedStory(null);
        setShowUpdate(false);
    }, [storyType]);

    const getStories = async () => {
        try {
            let response;
            switch (storyType) {
                case 'all':
                    response = await getAllStories();
                    break;
                case 'easy':
                    response = await getEasyStories();
                    break;
                case 'medium':
                    response = await getMediumStories();
                    break;
                case 'hard':
                    response = await getHardStories();
                    break;
                default:
                    console.error('Invalid storyType');
                    return;
            }
            setStories(response);
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStory(id);
            alert(`Story ${id} successfully deleted.`);
            getStories();
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    const handleUpdateClick = (story) => {
        setSelectedStory(story);
        setShowUpdate(true);
    };

    const handleUpdateComplete = () => {
        setSelectedStory(null);
        setShowUpdate(false);
        getStories();
    };

    return (
        <Container>
            {selectedStory && showUpdate ? (
                <AddStoryComponent storyData={selectedStory} onComplete={handleUpdateComplete} />
            ) : (
                <>
                    <h2 className="my-4 text-center">List of {storyType} stories</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Story ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Difficulty Level</th>
                                <th>Full Text</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.map(story => (
                                <tr key={story.id}>
                                    <td>{story.id}</td>
                                    <td>{story.title}</td>
                                    <td>{story.description}</td>
                                    <td>{story.difficulty_level}</td>
                                    <td>{story.fulltext}</td>
                                    <td>
                                        <Button 
                                            variant="info" 
                                            className="me-2" 
                                            onClick={() => handleUpdateClick(story)}
                                            style={{ marginBottom: '3cqh', marginTop: '3cqh', marginLeft: '1cqw' }}
                                        >
                                            Update
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(story.id)} style={{ marginLeft: '1cqw' }}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
};

export default StoryTable;