import React,{useEffect, useState} from 'react'
import axios from "axios"
import {useNavigate , useLocation} from "react-router-dom"
import Paper from '@mui/material/Paper';
import "./Password.css"
import DeleteIcon from '@mui/icons-material/Delete';
function Password() {

    const [userCredentials, setUserCredentials] = useState({
        name: "",
        password: "",
        url:""
      });
      const onChange = (e) =>{
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
      
      }
    const navigate = useNavigate()
    const location = useLocation();
    const userid = location.state.userid?location.state.userid:null;
    const [pass, setPass] = useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const a={userid:userid,name :userCredentials.name,password:userCredentials.password,url:userCredentials.url}
        axios.post('http://localhost:8080/password/addPasswords',a).then(response=>{
            
            
            console.log( response.data);
          if(response.data.length === 0){
            alert("URL already exist")
          }
          else{
            alert("password is addes");       
          }
    
            
        })

    
    }
    
    const handleFetch=(e)=>{
        e.preventDefault();
        const a={userid:userid,name :userCredentials.name,password:userCredentials.password,url:userCredentials.url}
        axios.post('http://localhost:8080/password/fetchPassword',a).then(response=>{
            
            setPass(response.data)
            console.log(pass);
        })
    }
    const Homepage = (e)=>{
      e.preventDefault();
      navigate('/home',{state:{userid}});
  }

  return (
    <>
<button type="button" className='btn btn-primary btn-lg btn-block' onClick={Homepage}>Back</button>
    <form className="register" onSubmit={handleSubmit}>
  <div >
    <label >Password Name</label>
    <input  className="form-control" name="name" required  placeholder="Enter name" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" required placeholder="Password" name="password" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label >URL</label>
    <input className="form-control"  name="url" required placeholder="URL" onChange={onChange}/>
  </div>
  <br/>
  
  <button type="submit" className="btn btn-primary">Submit</button><br></br><br></br>
  <button type='button' className="btn btn-primary " onClick={handleFetch}>show passwords</button>
</form>


<div style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
        {
          pass.map((listt,i)=>{
            return(
              <Paper elevation = {20} sx = {{margin : "2vh 10vw",padding:"1vh 1vw"}} key={i}>
                <table>
                    <thead>
                    <tr style={{border: "1px solid black"}}>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Password Name</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Password</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>URL</th>
                    <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Delete</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{border: "1px solid black"}}>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{listt["name"]}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{listt["password"]}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{listt["url"]}</td>
                    <td style={{border: "1px solid black",padding:"2vh 2vw"}}><DeleteIcon  color="error" onClick={()=>{
                        const a={userid:userid,name :userCredentials.name,password:userCredentials.password,url:listt['url']}
                        axios.post("http://localhost:8080/password/delete",a).then(response=>{
                            alert(response.data);

                        })
                    }}/></td>
                    </tr>
                    </tbody>
                </table>
              </Paper>
            )})}</div>
    </>
  )
}

export default Password
