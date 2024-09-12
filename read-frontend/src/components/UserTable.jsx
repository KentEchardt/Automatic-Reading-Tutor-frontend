import React, { useEffect, useState } from 'react';
import { deleteUser, getAdmins, getAllUsers, getReaders, getTeachers } from '../services/users';
import { Container, Table, Button } from 'react-bootstrap';

const UserTable = ({ userType }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [userType]);

    const getUsers = async () => {
        try {
            let response;
            switch (userType) {
                case 'all':
                    response = await getAllUsers();
                    break;
                case 'readers':
                    response = await getReaders();
                    break;
                case 'teachers':
                    response = await getTeachers();
                    break;
                case 'admins':
                    response = await getAdmins();
                    break;
                default:
                    console.error('Invalid user type');
                    return;
            }
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            alert(`User ${id} successfully deleted.`);
            getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container>
            <h2 className="my-4">List of {userType}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Reading Level</th>
                        <th>Date Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.reading_level}</td>
                            <td>{user.date_joined}</td>
                            <td>
                                <Button variant="info" className="me-2 my-1">Update</Button>
                                <Button variant="danger" onClick={() => handleDelete(user.id)} className="my-1">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserTable;