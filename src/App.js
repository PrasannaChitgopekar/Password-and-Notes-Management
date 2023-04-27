import React,{useState} from 'react'
import axios from "axios"
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import "./App.css";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Password from './components/Password';
import Notes from './components/Notes';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}></Route> 
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/password" element={<Password/>}></Route>
        <Route path="/notes" element={<Notes/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
