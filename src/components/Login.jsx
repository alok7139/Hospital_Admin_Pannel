import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../main'
import {useNavigate , Navigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {


    const {isauthenticated,setisauthenticated} = useContext(Context)

   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const [confirmpassword, setconfirmpassword] = useState("")

   const navigate = useNavigate();

   const handlelogin = async(e) => {
        e.preventDefault();
        try {
          const response  = await axios.post("https://hospital-backened-system.onrender.com/api/v1/user/login" , {email,password,confirmpassword, role:"Admin"} , {withCredentials:true , headers:{"Content-Type": "application/json"}})

          toast.success(response.data.message);
          setisauthenticated(true);
          navigate('/');
        } catch (error) {
          toast.error(error.response.data.message);
          
        }
   }

   if(isauthenticated){
    return <Navigate to={'/'}/>
   }


  return (
    <>
       <div className='container form-component' > 
       {/* <h2>Sign In</h2>
       <p>Please Login to continue</p>
       <p></p> */}
       <img src='https://static.vecteezy.com/system/resources/thumbnails/025/093/941/small/medical-cross-hospital-3d-medical-and-healthcare-icon-png.png' alt='logo'  className='logo'/>
       <h1 className='form-title'>Welcome to Jeevan</h1>
       <p>Only Admins Are Allowed?</p>
       <form onSubmit={handlelogin}>
        <input type='text' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter your email'/>
        <input type='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter your password'/>
        <input type='password' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} placeholder='Enter your confirm password'/>

        
        <div style={{justifyContent:"center" , alignItems:"center"}}>
            <button type='submit'>Login</button>
        </div>
       </form>
    </div>
    </>
  )
}

export default Login
