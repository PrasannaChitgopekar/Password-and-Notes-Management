import React,{useState} from 'react'
import axios from "axios"
import {useNavigate,useLocation} from "react-router-dom"
import "./Notes.css";
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

function Notes() {

    const [noteCredentials, setNoteCredentials] = useState({
        title: "",
        description: "",
        tag :""
      });
      
      const navigate = useNavigate()

      const location = useLocation();
    const userid = location.state.userid?location.state.userid:null;
    const [pass, setPass] = useState([])


    const handleFetchNotes = (e)=>{
        e.preventDefault();
        const a = {userid:userid,title:noteCredentials.title,tag:noteCredentials.tag,description :noteCredentials.description}
        axios.post("http://localhost:8080/notes/fetchNotes",a).then(response=>{
            
            
            setPass(response.data);
            console.log(pass);
        })
    }

    const handleSubmitNote =(e)=>{
        e.preventDefault();
        const a = {userid:userid,title:noteCredentials.title,tag:noteCredentials.tag,description :noteCredentials.description}
        axios.post("http://localhost:8080/notes/addNotes",a).then(response=>{
            if(response.data === true){
                alert("Note is added");
            }
            else{
                alert("Note with same title already exists");
            }
            
          })
    }
    const Homepage = (e)=>{
        e.preventDefault();
        navigate('/home',{state:{userid}});
    }
    const onChange = (e) =>{
        setNoteCredentials({ ...noteCredentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
      
      }

  return (
    <>
    <button type="button" className='btn btn-primary btn-lg btn-block' onClick={Homepage}>Back</button>
    <form className="register" onSubmit={handleSubmitNote}>
        <div >
          <label className="form-label">
            Title
          </label>
          <input
            className="form-control"
            onChange = {onChange}
            required
            name = "title"
          />
        </div>
        <div >
          <label  className="form-label">
            Tag
          </label>
          <input
            required
            name='tag'
            className="form-control"
            onChange = {onChange}
          />
        </div>
        <div >
          <label  className="form-label">
            Description
          </label>
          <textarea
            required
            name='description'
            className="form-control"
            onChange = {onChange}
            row="7"
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br></br><br></br>
        <button type="button" className="btn btn-primary" onClick={handleFetchNotes}>
          Show Notes
        </button>
      </form>

      <div style={{display:"flex",justifyContent:"center",margin :"2vh 2wv",flexWrap:"wrap"}}>
        {
          pass.map((listt,i)=>{
            return(
              <Paper elevation = {20} sx = {{margin : "7vh 5vw",padding:"1vh 1vw"}} key={i}>
                Title : {listt["title"]}
                <br></br>
                Tag : {listt["tag"]}
                <br></br>
                Description : {listt["description"]}
                <DeleteIcon  color="error" onClick={()=>{
                        const a={userid:userid,title :listt['title'],tag:noteCredentials.tag,description:noteCredentials.description}
                        axios.post("http://localhost:8080/note/delete",a).then(response=>{
                            alert(response.data);
                        })
                    }}/>
              </Paper>
            )})}</div>
    </>
  )
}

export default Notes
