import React,{useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./Signup.css"




function Signup() {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    password: "",
  });
  
  const navigate = useNavigate()

  
  const handleSubmitUser = async(e) => {
    e.preventDefault()
   
    const a = {uemail : userCredentials.email,upassword : userCredentials.password}
    axios.post('http://localhost:8080/signup',a).then(response=>{
      if(response.data === "done33"){
        console.log("done")
        navigate("/",{replace:true})
      }
      else{
        alert("Email already exist");
      }
        // console.log(response.data);
        
    })
}

const onChange = (e) =>{
  setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note

}
  

  return (
    <>
    
      <form className="register" onSubmit={handleSubmitUser}>
        <div >
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange = {onChange}
            required
            name = "email"
          />
        </div>
        <div >
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            name='password'
            className="form-control"
            id="exampleInputPassword1"
            onChange = {onChange}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        
      </form>
    </>
  );
}

export default Signup;
