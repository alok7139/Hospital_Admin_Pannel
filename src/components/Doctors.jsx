import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import {Navigate} from 'react-router-dom'

function Doctors() {
   
    const [doctors, setdoctors] = useState([]);
    const {isauthenticated} = useContext(Context);


    useEffect(() => {
       const fetchdoctors = async() => {
        try {
            const {data} = await axios.get("https://hospital-backened-system.onrender.com/api/v1/user/doctors" ,
             {withCredentials:true});
             setdoctors(data.doctors);
        } catch (error) {
            toast.error(error.response.data.message);
        }
       }
       fetchdoctors();
    }, [])

    if(!isauthenticated){
        return <Navigate to={'/login'}/>
    }


  return (
    <>
     
     <section className='page doctors'>

        <h1>DOCTORS</h1>
        <div className='banner'>
            {
                doctors && doctors.length>0 ? (doctors.map((element) => {
                  
                   return (
                    <div className="card">
                        <img src={element.docAvatar && element.docAvatar.url} alt='avatar'/>
                        <h4>{`${element.firstname} ${element.lastname}`}</h4>
                        <div className="details">
                            <p>Email : <span>{element.email}</span></p>
                            <p>phone : <span>{element.phone}</span></p>
                            <p>DOB : <span>{element.dob.substring(0,10)}</span></p>
                            <p>Department : <span>{element.doctorDepartment}</span></p>
                            <p>SEX : <span>{element.gender}</span></p>
                        </div>
                    </div>
                   ) 
                
            })) : <h1>No Registered Doctors found!</h1>
            }
        </div> 

     </section>
    </>
  )
}

export default Doctors
