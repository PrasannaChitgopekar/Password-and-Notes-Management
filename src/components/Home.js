import React,{useState} from 'react'
import axios from "axios"
import {useNavigate , useLocation} from "react-router-dom"
import { Link } from "react-router-dom";
import "./Home.css"

//npm install @mui/material @emotion/react @emotion/styled
//npm install @mui/material @mui/styled-engine-sc styled-components

import Paper from '@mui/material/Paper';
import { alignProperty } from '@mui/material/styles/cssUtils';
function Home(props) {
  const navigate = useNavigate()
    const location = useLocation();
    const userid = location.state.userid?location.state.userid:null;
    const handlepassword =(e)=>{
      e.preventDefault();
      navigate('/password',{state:{userid}})
    }
    const handleNotes=(e)=>{
      e.preventDefault();
      navigate('/notes',{state:{userid}});
    }
  return (
    <div className='register1'>
        
      {/* <div>your user id is {userid} </div> */}
      <Paper elevation={20} sx = {{margin : "10vh 30vw",padding:"10vh 14vw"}} >
      <button type="button" className="btn btn-primary btn-lg btn-block"  onClick={handlepassword}>Password</button>
      </Paper>
      
      <Paper elevation={20} sx = {{margin : "10vh 30vw",padding:"10vh 16vw"}} >
      <button type="button" className="btn btn-primary btn-lg btn-block"  onClick={handleNotes}>Notes</button>
      </Paper>

    </div>
  )
}

export default Home
