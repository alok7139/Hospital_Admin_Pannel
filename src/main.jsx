import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

import { useState } from 'react'
import { createContext } from 'react'

export const Context = createContext({isauthenticated:false});

const Appwrapper = () => {
  const [isauthenticated, setisauthenticated] = useState(false)
  const [user, setuser] = useState(false);

  return <Context.Provider value={{isauthenticated,setisauthenticated,user,setuser}}>
      <App/>
  </Context.Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Appwrapper />
    </BrowserRouter>
    
  </React.StrictMode>,
)
