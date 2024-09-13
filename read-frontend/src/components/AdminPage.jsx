import React, { useState } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import HeaderComponent from './HeaderComponent';

import { FaHouse } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { GiBookshelf } from "react-icons/gi";
import { PiBooksFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { FaBookReader } from "react-icons/fa";
import AddStoryComponent from './AddStoryComponent';
import { FiLogOut } from 'react-icons/fi'; 
import StoryTable from './StoryTable';
import UserTable from './UserTable';
import StoryStatistics from './StoryStatistics';







// Component to display admin page, comprising a Sidebar with content options and an area that displays the selected content
const AdminPage = () => {


  const [sideContent, setSideContent] = useState(<div/>);

  //Change content depending on buton clicked
  const handleContentChange = (content) => {
    setSideContent(content);
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user authentication (remove tokens, clear state, etc.)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Redirect to login page
    navigate('/login');
  };
  return (
    <div>
     {/* <div style={{backgroundColor:'black', height:'5cqh', width:'100%'}}></div> */}
     
    <div style={{display:'flex', minHeight:'100cqh'}} >
        

       <div className='' >
          <Sidebar width='15cqw' className='primary-colour ' style={{paddingTop:'3cqh'}}>
          <Menu >

            {/* logo Component - at the moment changes content to blank screen - don't leave this in final product */}
            <div className='text-center justify-content-center' style={{paddingTop:'2cqh', paddingBottom:'2cqh', cursor:'pointer'}} onClick={()=>handleContentChange(<div/>)}>
            <img src="/images/ReadLogoNoBG.png" style={{width:'10cqw', justifyContent:'center', height:'auto'}} ></img>
            </div>

            
            <SubMenu label="Stories">
              <MenuItem icon={<GiBookshelf/>} onClick={()=>{handleContentChange(<StoryTable storyType='all'/>)} }> All </MenuItem>
              <MenuItem icon={<FaBook/>} onClick={()=>{handleContentChange(<StoryTable storyType='easy'/>)} }>Easy</MenuItem>
              <MenuItem icon={<PiBooksFill/>} onClick={()=>{handleContentChange(<StoryTable storyType='medium'/>)} }>Medium</MenuItem>
              <MenuItem icon={<ImBooks/>} onClick={()=>{handleContentChange(<StoryTable storyType='hard'/>)} }>Hard</MenuItem>
              <MenuItem icon={<IoAddCircle />} onClick={()=>{handleContentChange(<AddStoryComponent/>)} }>Add Story</MenuItem>
            </SubMenu>
            <SubMenu label='Users'>
                <MenuItem icon={<FaUser />}  onClick={()=>{handleContentChange(<UserTable userType='all'/>)} }>All</MenuItem>
                <MenuItem icon={<FaBookReader />} onClick={()=>{handleContentChange(<UserTable userType='readers'/>)} }>Readers</MenuItem>
                <MenuItem icon={<BsPersonWorkspace />} onClick={()=>{handleContentChange(<UserTable userType='teachers'/>)} } >Teachers</MenuItem>
                <MenuItem icon={<RiAdminFill/>} onClick={()=>{handleContentChange(<UserTable userType='admins'/>)} }>Admins</MenuItem>
         
            </SubMenu>
            <SubMenu label='Statistics'>
                <MenuItem icon={<FaUser />}>Users</MenuItem>
                <MenuItem icon={<GiBookshelf />} onClick={()=>{handleContentChange(<StoryStatistics/>)} } >Stories</MenuItem> 
                
                
            </SubMenu>
            <SubMenu label='Management'>
                <MenuItem icon={<IoIosSettings />}>Settings</MenuItem>
                <MenuItem icon={<IoIosSettings />}>Extras</MenuItem>
                <MenuItem icon={<IoIosSettings />}>Data Export</MenuItem>
              
            </SubMenu>

                        {/* Spacer to push the Sign Out button to the bottom */}
            <div style={{flex: 1}}></div>

            {/* Sign Out Button */}
            <MenuItem 
              icon={<FiLogOut />} 
              onClick={handleSignOut}
              style={{marginTop: 'auto', borderTop: '1px solid #ccc'}}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Sidebar>; 
          </div>
         

          <div style={{paddingTop:'10cqh', width:'100%'}} className='justify-content-center'>
           {sideContent}
          </div>


    

  
      

      

    </div>
    </div>
  )
}

export default AdminPage