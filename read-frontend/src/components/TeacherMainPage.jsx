import React from 'react'
import HeaderComponent from './HeaderComponent'

//Component for displaying the Teacher homepage
const TeacherMainPage = () => {

  const dummydata = {
    students: [
      {
        id: 1,
        username: 'jdoe',
        firstname: 'John',
        lastname: 'Doe',
        readingLevel: 'Intermediate',
        email: 'jdoe@example.com',
      },
      {
        id: 2,
        username: 'asmith',
        firstname: 'Anna',
        lastname: 'Smith',
        readingLevel: 'Beginner',
        email: 'asmith@example.com',
      },
      {
        id: 3,
        username: 'bwilliams',
        firstname: 'Brian',
        lastname: 'Williams',
        readingLevel: 'Advanced',
        email: 'bwilliams@example.com',
      },
      {
        id: 4,
        username: 'kjones',
        firstname: 'Kathy',
        lastname: 'Jones',
        readingLevel: 'Beginner',
        email: 'kjones@example.com',
      },
      {
        id: 5,
        username: 'mbrown',
        firstname: 'Michael',
        lastname: 'Brown',
        readingLevel: 'Intermediate',
        email: 'mbrown@example.com',
      },
    ],
  };
  
  return (
    <div>
      <HeaderComponent/>
    <div style={{minHeight:'80cqh'}}>
        

        <h1 className='text-center' style={{marginTop:"5cqh"}}>[Teacher]'s Class</h1>
        <br></br>
      <div className='container'>
        <h2 className='text-center'>List of Students</h2>
        <br></br>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Reading Level</th>
                    <th>Email</th>           
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
               dummydata.students.map(user => 
                 <tr key={user.id}>
                         <td>{user.id}</td>
                        <td>{user.username}</td>
                         <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.readingLevel}</td>
                         <td>{user.email}</td>
                       
                     

                        <td><button className='btn btn-info' >Update</button>
                        <button className='btn btn-dangerq'  style= {{marginLeft: '10px'}}>
                           Delete</button>  
                         </td>
                     </tr>
                     )
                }

                
            </tbody>
        </table>    
        </div>
    </div>
    </div>
  )
}

export default TeacherMainPage