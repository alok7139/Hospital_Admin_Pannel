import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { Context } from '../main'
import { useState } from 'react'
import {useNavigate , Navigate} from 'react-router-dom'

function Addnewadmin() {

    const navigate = useNavigate();
   
    const {isauthenticated} = useContext(Context)

  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [dob, setdob] = useState("")
  const [gender, setgender] = useState("")
  const [password, setpassword] = useState("")

  const handleaddnewadmin = async(e) => {
    e.preventDefault();
    try {
      await axios.post("https://hospital-backened-system.onrender.com/api/v1/user/admin/addnew" , {firstname,lastname,email,phone,dob,gender,password ,} , {withCredentials:true , headers:{"Content-Type": "application/json"}})
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        setfirstname("");
        setlastname("");
        setemail("");
        setphone("");
        // setNic("");
        setdob("");
        setgender("");
        setpassword("");
      });
      
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }

  if(!isauthenticated){
    return <Navigate to={'/login'}/>
  }


  return (
    <>
       <section className="page">
         
       <div className='container form-component add-admin-form'>
        <img src='https://static.vecteezy.com/system/resources/thumbnails/025/093/941/small/medical-cross-hospital-3d-medical-and-healthcare-icon-png.png' alt='logo' className='logo'/>
        <h1 className='form-title'>Add NEW ADMIN</h1>
      
        
      <form onSubmit={handleaddnewadmin}>
        <div>
          <input type='text' placeholder='Enter Firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)}/>
          <input type='text' placeholder='Enter Lastname' value={lastname} onChange={(e) => setlastname(e.target.value)}/>
        </div>
        <div>
          <input type='text' placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}/>
          <input type='number' placeholder='Enter Phone Number' value={phone} onChange={(e) => setphone(e.target.value)}/>
         </div>
          <div>       
          <input type='date' placeholder='Enter Date of Birth' value={dob} onChange={(e) => setdob(e.target.value)}/>
          <select value={gender} onChange={(e) => setgender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
          </select>
        </div>
        <div>
        <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setpassword(e.target.value)}/>
        <input type='text' placeholder='Admin Staff Reference'/>
        
        </div>

       
        <div style={{justifyContent:"center" , alignItems:"center"}}>
            <button type='submit'>ADD</button>
        </div>

      </form>
    </div>
   
       </section>
    </>
  )
}

export default Addnewadmin
