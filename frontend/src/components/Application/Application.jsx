import React, { useContext, useState } from 'react';
import {Context} from "../../main";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const Application = () => {
 const [name, setname]=useState("");
 const [coverletter, setcoverletter]=useState("");
 const [resume, setresume]=useState("");
 const [phone, setphone]=useState("");
 const [address, setaddress]=useState("");
 const [email, setemail]=useState(null);

 const {isAuthorized, user}=useContext(Context);

 const navigateTo=useNavigate();

 // function to handle file input changes

 const handlefilechanges=(event)=>{
  const resume=event.target.files[0];
  setresume(resume);
 };

 const {id}=useParams();
 const handleApplication=async(e)=>{
  e.preventDefault();
  const formData=new FormData();                 // while working with files we first store data in form then send it
  formData.append("name", name);
  formData.append("email", email);
  formData.append("coverletter", coverletter);
  formData.append("address", address);
  formData.append("phone", phone);
  formData.append("resume", resume);
  formData.append("jobid", id);

  try{
   const {data}=await axios.post("http://localhost:4000/api/v1/application/post", formData,
    {
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })

    // posting empty all the fields
    setname("");
    setemail("");
    setaddress("");
    setphone("");
    setcoverletter("");
    setresume("");
    toast.success(data.message);
    navigateTo("/job/getall");
  }catch(error){
    toast.error(error.response.data.message);
  }
 };

 if(!isAuthorized || (user && user.role==="Employer")){
  navigateTo("/");
 }

  return (
    <section className='application'>
    <div className='container'>
      <h3>Application Form</h3>
      <form onSubmit={handleApplication}>
       <input type="text" placeholder="Your Name" value={name} onChange={(e)=>setname(e.target.value)} />
       <input type="text" placeholder="Your Email" value={email} onChange={(e)=>setemail(e.target.value)} />
       <input type="number" placeholder="Your Phone" value={phone} onChange={(e)=>setphone(e.target.value)} />
       <input type="text" placeholder="Your Address" value={address} onChange={(e)=>setaddress(e.target.value)} />
       <textarea value={coverletter} onChange={(e)=>setcoverletter(e.target.value)} placeholder="Cover Letter"/>
       <div>
        <label 
            style={{
            textAlign:"start",
            display:"block",
            fontSize:"20px"
            }}>
            Upload Resume
            </label>
            <input type="file" accept=".jpg, .png, .webp" onChange={handlefilechanges}
              style={{
                width:"100%"
              }}
            />
       </div>
       <button type="submit">Send Application</button>
      </form>
    </div>
   </section>
  )
}

export default Application