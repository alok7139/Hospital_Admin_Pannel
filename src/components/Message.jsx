import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import {Navigate} from 'react-router-dom'

function Message() {

    const [message, setmessage] = useState([])

    const {isauthenticated} = useContext(Context)

    useEffect(() => {
       const fetchmessage = async() => {
        try {
            const {data} = await axios.get("https://hospital-backened-system.onrender.com/api/v1/message/getall" , {withCredentials:true});

            setmessage(data.message);
        } catch (error) {
            console.log("ERROR OCCURED WHILE FETCHING MESSAGES" , error)
        }
       }
       fetchmessage();

    },[])

    if(!isauthenticated){
        return <Navigate  to={'/login'}/>
    }

  return (
     <>
       <section className='page messages'>
        <h1>Messages</h1>
        <div className='banner'>
            {
                message && message.length > 0 ?  (message.map((element) => {
                    return (
                        <div className='card'>
                            <div className='details'>
                               <p>First Name : <span>{element.firstname}</span></p>
                               <p>Last Name : <span>{element.lastname}</span></p>
                               <p>Email : <span>{element.email}</span></p>
                               <p>Phone : <span>{element.phone}</span></p>
                               <p>Message : <span>{element.message}</span></p>
                            </div>
                            
                        </div>
                    )
                })) : (<h1>No Messages!</h1>)
            }

        </div>

       </section>
     </>
  )
}

export default Message
