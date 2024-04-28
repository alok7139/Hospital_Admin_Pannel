import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

function Dashboard() {

    const {isauthenticated,user} = useContext(Context)


    const [appointment, setappointments] = useState([])


    useEffect(() => {
         const fetchappointment = async() => {
            try {
                const {data} = await axios.get("https://hospital-backened-system.onrender.com/api/v1/appointment/getall" , {withCredentials:true});
                setappointments(data.appointment)
            } catch (error) {
                setappointments([]);
                console.log("Some error occured",error)
            }
         };
         fetchappointment();
    } , [])

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
          const { data } = await axios.put(
            `https://hospital-backened-system.onrender.com/api/v1/appointment/update/${appointmentId}`,
            { status },
            { withCredentials: true }
          );
          setappointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment._id === appointmentId
                ? { ...appointment, status }
                : appointment
            )
          );
          toast.success(data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
   
    if(!isauthenticated){
        return <Navigate  to={'/login'}/>
    }

  return (
    <>
    <section className="dashboard page">
        <div className='banner'>
            <div className='firstBox'>
                <img src='/doc.png' alt='docimg'/>
                <div className='content'>
                    <div>
                        <p>Hello ,</p>
                        <h5 >
                            {
                                user && `${user.firstname} ${user.lastname}`
                            }
                        </h5>
                    </div>
                    <p> You have to see into all patient appointments and their corresponding interactions with doctors. 
                    </p>

                </div>

            </div>
            <div className="secondBox">
                <p>Total Appointments  </p>
                <h1>{appointment.length}</h1>

            </div>

            <div className="thirdBox">
                <p>Verified Doctors  </p>
                <h1>20</h1>

            </div>

        </div>
        <div className="banner">
            <h5>Appointments</h5>
            <table>
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Visited</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointment && appointment.length > 0 ? (
                            
                            appointment.map((appointments) =>{
                                return (
                                    <tr key={appointments._id}>
                                       <td>{`${appointments.firstname} ${appointments.lastname}`}</td>
                                       <td>{appointments.appointment_date.substring(0,16)}</td>
                                       <td>{`${appointments.doctor.firstname} ${appointments.doctor.lastname}`}</td>
                                       <td>{appointments.department}</td>
                                       <td>
                                         
                                         <select className={appointments.status === "Pending" ? "value-pending" : appointments.status === "Rejected" ? "value-rejected" : "value-accepted"}
                                         value={appointments.status} onChange={(e)  => handleUpdateStatus(appointments._id , e.target.value)}
                                         >
                                            <option value="Pending" className='value-pending'>Pending</option>
                                            <option value="Accepted" className='value-accepted'>Accepted</option>
                                            <option value="Rejected" className='value-rejected'>Rejected</option>
                                         </select>
                                        </td>
                                        <td>{appointments.hasvisited === true ? <GoCheckCircleFill className='green'/> : <AiFillCloseCircle className='red'/> }</td>
                                    </tr>
                                )
                            })
                        ): <h1>No Appointments</h1>
                    }
                </tbody>
            </table>
            {}
        </div>
    </section>
    
    </>
  )
}

export default Dashboard
