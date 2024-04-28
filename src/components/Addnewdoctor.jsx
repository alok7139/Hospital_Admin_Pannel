import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { Context } from '../main'
import { useState } from 'react'
import {useNavigate , Navigate} from 'react-router-dom'

function Addnewdoctor() {

    const navigate = useNavigate();
   
    const {isauthenticated} = useContext(Context)

  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [dob, setdob] = useState("")
  const [gender, setgender] = useState("")
  const [password, setpassword] = useState("")
  const [doctorDepartment, setdoctordepartment] = useState("")
  const [docAvatar, setdocAvatar] = useState("")
  const [docavatarpreview, setdocavatarpreview] = useState("")

 
  const handleavatar = async(e) => {
    const file = e.target.files[0];
    const reader  = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =() => {
        setdocavatarpreview(reader.result)
        setdocAvatar(file);
    }
  } 

  const handleaddnewdoctor = async(e) => {
    e.preventDefault();
    try {
        const formdata = new FormData();
        formdata.append("firstname" , firstname);
        formdata.append("lastname" , lastname);
        formdata.append("email" , email);
        formdata.append("phone" , phone);
        formdata.append("gender" , gender);
        formdata.append("dob" , dob);
        formdata.append("password" , password);
        formdata.append("doctorDepartment" , doctorDepartment);
        formdata.append("docAvatar" , docAvatar);

      await axios.post("https://hospital-backened-system.onrender.com/api/v1/user/doctor/addnew" ,
       formdata , {withCredentials:true , headers:{"Content-Type": "multipart/form-data"}})
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        // setfirstname("");
        // setlastname("");
        // setemail("");
        // setphone("");
        // // setNic("");
        // setdob("");
        // setgender("");
        // setpassword("");
      });
      
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }

  if(!isauthenticated){
    return <Navigate to={'/login'}/>
  }

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];


  return (
    <>
       <section className="page">
         
       <div className='container form-component add-doctor-form'>
        <img src='https://static.vecteezy.com/system/resources/thumbnails/025/093/941/small/medical-cross-hospital-3d-medical-and-healthcare-icon-png.png' alt='logo' className='logo'/>
        <h1 className='form-title'>Register New Doctor</h1>
      
        
      <form onSubmit={handleaddnewdoctor}>

       <div className="first-wrapper">
         <div>
            <img src={docavatarpreview ? `${docavatarpreview} ` : '/docHolder.jpg'} alt='docavatar'/>
            <input type='file' onChange={handleavatar} />
         </div>
         <div>
         <input type='text' placeholder='Enter Firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)}/>
         <input type='text' placeholder='Enter Lastname' value={lastname} onChange={(e) => setlastname(e.target.value)}/>

         <input type='text' placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}/>
          <input type='number' placeholder='Enter Phone Number' value={phone} onChange={(e) => setphone(e.target.value)}/>

          <input type='date'  value={dob} onChange={(e) => setdob(e.target.value)} style={{paddingBottom:"20px" }}/>
          <select value={gender} onChange={(e) => setgender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
          </select>


          <input type='password' placeholder='Enter Password' value={password} onChange={(e) => setpassword(e.target.value)}/>
        {/* <input type='text' placeholder='Doctor Staff Reference'/> */}

          <select value={doctorDepartment} onChange={(e) => setdoctordepartment(e.target.value)}>
              <option value="">Select Department</option>
                 {
                    departmentsArray.map((element,index) => {
                        return (
                            <option value={element} key={index}>{element}</option>
                        )
                    })
                 }
          </select>
          
         </div>
       </div>


       
        <div style={{justifyContent:"flex-end" , alignItems:"center"}}>
        <button type='submit'>ADD</button>
        </div>

      </form>
    </div>
   
       </section>
    </>
  )
}

export default Addnewdoctor;

