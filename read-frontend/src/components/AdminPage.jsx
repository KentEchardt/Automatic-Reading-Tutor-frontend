import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
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
import AdminTable from './AdminTable';






const AdminPage = () => {

  // const [sideContent, setSideContent] = useState(<PropertyManagement viewing={'all'}/>);

  
  const handleContentChange = (content) => {
    setSideContent(content);
  };

  const navigator = useNavigate();
  return (
    <div>
     
     
    <div style={{display:'flex', gap:'10cqw', minHeight:'100cqh'}} >
        

       <div className='primary-colour' >
          <Sidebar width='15cqw' className='primary-colour' style={{paddingTop:'3cqh'}}>
          <Menu >
            <div className='text-center justify-content-center' style={{paddingTop:'2cqh', paddingBottom:'2cqh'}}>
            <img src='images/ReadLogo.jpeg' style={{width:'10cqw', justifyContent:'center', height:'auto'}}></img>
            </div>

            
            <SubMenu label="Stories">
              <MenuItem icon={<GiBookshelf/>} > All </MenuItem>
              <MenuItem icon={<FaBook/>} >Easy</MenuItem>
              <MenuItem icon={<PiBooksFill/>} >Medium</MenuItem>
              <MenuItem icon={<ImBooks/>} >Hard</MenuItem>
              <MenuItem icon={<IoAddCircle />} >Add Story</MenuItem>
            </SubMenu>
            <SubMenu label='Users'>
                <MenuItem icon={<FaBookReader />}>Readers</MenuItem>
                <MenuItem icon={<BsPersonWorkspace />} >Teachers</MenuItem>
                <MenuItem icon={<RiAdminFill/>}>Admins</MenuItem>
         
            </SubMenu>
            <SubMenu label='Statistics'>
                <MenuItem icon={<FaUser />}>Users</MenuItem>
                <MenuItem icon={<GiBookshelf />} >Stories</MenuItem> 
                
                
            </SubMenu>
            <SubMenu label='Management'>
                <MenuItem icon={<IoIosSettings />}>Settings</MenuItem>
                <MenuItem icon={<IoIosSettings />}>Extras</MenuItem>
                <MenuItem icon={<IoIosSettings />}>Data Export</MenuItem>
                
                
            </SubMenu>
          </Menu>
        </Sidebar>; 
          </div>
         

          <div style={{paddingTop:'3cqh'}} className='justify-content-center'>
            <AdminTable viewing={""}/>
          </div>

    

       
      

      

    </div>
    </div>
  )
}

export default AdminPage