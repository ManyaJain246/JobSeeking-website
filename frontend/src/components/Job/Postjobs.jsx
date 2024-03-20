import React, {useContext, useState} from 'react'
import { Context } from '../../main';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Postjobs = () => {

  const [title, settitle]=useState("");
  const [description, setdescription]=useState("");
  const [category, setcategory]=useState("");
  const [country, setcountry]=useState("");
  const [city, setcity]=useState("");
  const [location, setlocation]=useState("");
  const [salaryfrom, setsalaryfrom]=useState("");
  const [salaryto, setsalaryto]=useState("");
  const [fixedsalary, setfixedsalary]=useState("");
  const [salarytype, setsalarytype]=useState("default");

  const {isAuthorized, user}=useContext(Context);

  const navigateTo=useNavigate();

  const handlepost=async(e)=>{
    e.preventDefault();
    if(salarytype==="Fixed Salary"){
      setsalaryfrom("");
      setsalaryto("");
    }else if(salarytype==="Ranged Salary"){
      setfixedsalary("")
    }else{
      setsalaryfrom("");
      setsalaryto("");
      setfixedsalary("");
    }

    await axios.post("http://localhost:4000/api/v1/job/post", 
    fixedsalary.length>=4
    ? {title, description, country, city, location, fixedsalary, category}
    : {title, description, country, city, location, salaryfrom, salaryto, category},
    {
      withCredentials:true,
      headers:{
        "Content-Type":"application/json",
      }
    })
    .then((res)=>toast.success(res.data.message))
    .catch((error)=>{
      toast.error(error.response.data.message)
    })
  }

  if(!isAuthorized || (user && user.role!=="Employer")){
    navigateTo("/")
  }

  return (
    <div className='job_post page'>
      <div className='container'>
        <h4>Post New Job</h4>
        <form onSubmit={handlepost}>
        <div className='wrapper'>
          <input type="text" value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Job Title"></input>
          <select value={category} onChange={(e)=>setcategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Web Development">Web Development</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Flutter Developer">Flutter Developer</option>
            <option value="Mern Stack Development">Mern Stack Development</option>
            <option value="Graphic Designing">Graphic Designing</option>
            <option value="Video Animation">Video Animation</option>
            <option value="Account and Finance">Account and Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Artificial Intellligence">Artificial Intellligence</option>
          </select>
        </div>
        <div className='wrapper'>
          <input type="text" value={country} onChange={(e)=>setcountry(e.target.value)} placeholder="Country"/>
          <input type="text" value={city} onChange={(e)=>setcity(e.target.value)} placeholder="City"/>
        </div>

        <input type="text" value={location} onChange={(e)=>setlocation(e.target.value)} placeholder="Location"/>

        <div className='salary_wrapper'>
          <select value={salaryfrom} onChange={(e)=>setsalarytype(e.target.value)}>
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>
          <div>
            {
              salarytype==="default" ? (<p>Please Provide Salary Type *</p>) : salarytype==="Fixed Salary" ? (
                <input type="number" placeholder="Enter Fixed Salary" value={fixedsalary} onChange={(e)=>setfixedsalary(e.target.value)}/>
              ) : (
                <div className='ranged_salary'>
                <input type="number" placeholder="Salary From" value={salaryfrom} onChange={(e)=>setsalaryfrom(e.target.value)}/>
                <input type="number" placeholder="Salary To" value={salaryto} onChange={(e)=>setsalaryto(e.target.value)}/>
                </div>
              )
            }
          </div>
        </div>

        <textarea rows="10" value={description} onChange={(e)=>setdescription(e.target.value)} placeholder='Description'></textarea>
        <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  )
}

export default Postjobs