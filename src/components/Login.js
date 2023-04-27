import React,{useState} from 'react'
import axios from "axios"
import {useNavigate , navigate} from "react-router-dom"
import "./Signup.css"
function Login() {

    const [userCredentials, setUserCredentials] = useState({
        name: "",
        password: "",
      });

      const navigate = useNavigate()
      const navigation = useNavigate()
      const handleSubmitUser = async(e) => {
        e.preventDefault()
       
        const a = {uemail : userCredentials.email,upassword : userCredentials.password}
        axios.post('http://localhost:8080/login',a).then(response=>{
            
          if(response.data.length === 0){
            console.log(response.data[response.data.length-1]);
            console.log("no")
          }
          else{
            console.log("done")
            console.log(response.data[response.data.length-1].userid);
            // const userid = response.data[response.data.length-1].userid;
            navigate('/home',{state:{userid:response.data[response.data.length-1].userid} })
            
          }
    
            
        })
    }
    const onChange = (e) =>{
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
      
      }
      const handleRedirect = () => {
        navigate("/signup");
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
            name = "email"
          />
        </div>
        <div >
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name='password'
            className="form-control"
            id="exampleInputPassword1"
            onChange = {onChange}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          login
        </button>
        <span>        </span> <span>          </span>new use?
        <button type="submit" className="btn btn-primary" onClick={handleRedirect}>
            Signup
        </button>
      </form>
    </>
  )
}

export default Login
