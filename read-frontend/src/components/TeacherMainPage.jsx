import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from './HeaderComponent';
import { createClass, getClasses } from '../services/classes';
import { getStudents } from '../services/classes';

//Component for displaying teacher tables - classes and students in classes belonging to Teacher logged in
const TeacherMainPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      console.log(response)
      setClasses(response.classes); 
    } catch (error) {
      console.error('Error fetching class data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.students);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchClasses();
    fetchStudents();
  }, []);

  const handleCreateClass = async () => {
    try {
      await createClass();
      // Optionally refresh the list or notify the user
      const response = await getClasses(); // Refresh the class list
      fetchClasses()
      alert('New class created.')
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <HeaderComponent />
      <div style={{ minHeight: '80vh' }}>
        <h1 className='text-center' style={{ marginTop: "5vh" }}>Teacher's Class</h1>
        <br />
        <div className='container'>
          <h2 className='text-center'>List of Classes</h2>
          <br />
          <button className='btn btn-primary' onClick={handleCreateClass}>Create New Class</button>
          <br /><br />
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Class Code</th>
                <th>Number of Students</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(classItem =>
                <tr key={classItem.class_code}>
                  <td>{classItem.class_code}</td>
                  <td>{classItem.num_students}</td>
                </tr>
              )}
            </tbody>
          </table>

          <h2 className='text-center' style={{marginTop:'5cqh'}}>List of Students</h2>
          <br />
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Reading Level</th>
                <th>Class Code</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {students.map(user =>
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.reading_level?user.reading_level.toFixed(2):0}</td>
                  <td>{user.class_code}</td>
                  {/* <td>
                   
                    <button className='btn btn-danger' style={{ marginLeft: '10px' }}>Remove</button>
                  </td> */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherMainPage;
