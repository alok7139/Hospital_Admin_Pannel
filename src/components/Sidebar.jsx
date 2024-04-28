import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Context } from '../main';
import {TiHome} from 'react-icons/ti'
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Sidebar() {
 
    const navigate = useNavigate();

    const [show,setshow] = useState(false);

    const {isauthenticated,setisauthenticated} = useContext(Context)

    const handlelogout = async() => {
         
        await axios.get("https://hospital-backened-system.onrender.com/api/v1/user/admin/logout" , 
        {withCredentials:true, }).then(res => {
            toast.success(res.data.message);
            setisauthenticated(false);
        }).catch(err => {
            toast.error(err.response.data.message);
        })
        
      
} 

    const gotohome = () => {
       navigate('/');
       setshow(!show);
    }

    const gotodcotrspage = () => {
        navigate('/doctors');
        setshow(!show);
     }

     const gotomessage = () => {
        navigate('/message');
        setshow(!show);
     }

     const gotodoctoraddnew = () => {
        navigate('/doctor/addnew');
        setshow(!show);
     }

     const gotoadminaddnew = () => {
        navigate('/admin/addnew');
        setshow(!show);
     }

  return (
    <>
      <nav style={!isauthenticated ? {display:"none"} : {display:"flex"}} className={show ? "show sidebar" : "sidebar"}>
         <div className='links'>
              <TiHome onClick={gotohome}/>
              <FaUserDoctor onClick={gotodcotrspage}/>
              <MdAddModerator onClick={gotoadminaddnew}/>
              <IoPersonAddSharp onClick={gotodoctoraddnew}/>
              <AiFillMessage onClick={gotomessage}/>
              <RiLogoutBoxFill onClick={handlelogout}/>
         </div>
      </nav>

      <div className='wrapper' style={!isauthenticated ? {display:"none"} : {display:"flex"}}>
         <GiHamburgerMenu className='hamburger' onClick={() => setshow(!show)}/>
      </div>
    </>
  )
}

export default Sidebar
