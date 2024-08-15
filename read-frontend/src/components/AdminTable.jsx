import React from 'react'

function AdminTable ({viewing}) {
  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h2 className='text-center'>List of Users</h2>
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
                // properties.map(property => 
                //     <tr key={user.id}>
                //         <td>{user.id}</td>
                //         <td>{user.username}</td>
                //         <td>{user.firstname}</td>
                //         <td>{user.lastname}</td>
                //         <td>{user.email}</td>
                //        
                //      

                //         <td><button className='btn btn-info' >Update</button>
                //         <button className='btn btn-dangerq'  style= {{marginLeft: '10px'}} onClick={()=>handleDelete(property.id)}>
                //             Delete</button>  
                //         </td>
                //     </tr>
                //     )
                }

                
            </tbody>
        </table>    
    </div>
  )
}

export default AdminTable