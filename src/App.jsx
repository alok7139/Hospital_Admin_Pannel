
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Message from './components/Message'
import Doctors from './components/Doctors'
import Addnewdoctor from './components/Addnewdoctor'
import Addnewadmin from './components/Addnewadmin'
import Sidebar from './components/Sidebar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useState } from 'react'
import { useContext } from 'react'
import { Context } from './main'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  // const [first, setfirst] = useState(second)

  const {isauthenticated,setisauthenticated,setuser} = useContext(Context);

  useEffect(() => {
    const fetchuser = async() => {
       try {
         const response = await axios.get("https://hospital-backened-system.onrender.com/api/v1/user/admin/me" , {withCredentials:true});
         setisauthenticated(true);
         setuser(response.data.user);
       } catch (error) {
          setisauthenticated(false)
          setuser({});
       }
    }
    fetchuser();
  } , [isauthenticated]);
  

  return (
    <>
    {/* <div>Sidebar</div> */}
       <Sidebar/>
       <Routes>
         <Route path='/' element={<Dashboard/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/doctor/addnew' element={<Addnewdoctor/>}/>
         <Route path='/admin/addnew' element={<Addnewadmin/>}/>
         <Route path='/message' element={<Message/>}/>
         <Route path='/doctors' element={<Doctors/>}/>
       </Routes>
       <ToastContainer position="top-center" />
    </>
  )
}

export default App
