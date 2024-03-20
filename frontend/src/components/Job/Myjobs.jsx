import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import {FaCheck} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';

const Myjobs = () => {
  const [myjobs, setmyjobs]=useState([]);
  const[editing, setediting]=useState(null);
  const {isAuthorized, user}=useContext(Context);

  const navigateTo=useNavigate();

  // Fetch all jobs of an employer

  useEffect(()=>{
   const fetchjobs=async()=>{
    try{
    const {data}=await axios.get("http://localhost:4000/api/v1/job/getmyjobs", {withCredentials:true});
    setmyjobs(data.myjobs);
    }catch(error){
     toast.error(error.response.data.message);
     setmyjobs([]);
    }
   }

   fetchjobs();
  }, [])                          // whenever page refreshes it will run

  if(!isAuthorized || (user && user.role!=="Employer")){
    navigateTo("/");
  }

  // function for enabling editing
  const handleenableedit=(jobid)=>{
    setediting(jobid);
  }

  // function for disabling editing
  const handledisableedit=(jobid)=>{
    setediting(jobid);
  }

  // function for editing job
  const handleupdatejobs=async(jobid)=>{
    const updatedjob=myjobs.find((job)=>job._id===jobid)
    await axios.put(`http://localhost:4000/api/v1/job/updatejobs/${jobid}`, updatedjob, {withCredentials:true})             // updatedjob ka data denge
          .then((res)=>{
            toast.success(res.data.message);
            setediting(null);
          }).catch((error)=>{
            toast.error(error.response.data.message);
          });
  }

  // Function for deleting jobs
  const handledeletejobs=async(jobid)=>{
    await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobid}`, {withCredentials:true})
    .then((res)=>{
      toast.success(res.data.message)
      setmyjobs(prevjobs=>prevjobs.filter((job)=>job._id!==jobid))        // deleted job ka data chod ke baki jobs ka data dena
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  }

  // Function for changing the input

  const handleinputchanges=(jobid, field, value)=>{
   setmyjobs((prevjobs)=>
    prevjobs.map((job)=>
      job._id===jobid ? {...job, [field] : value} : job
    )
   )
  }

  return (
    <div className='myJobs page'>
     <div className='container'>
      <h4>Your Posted Jobs</h4>
      {
       myjobs &&  myjobs.length >0 ?
         <>
          <div className='banner'>
            {
              myjobs.map((element)=>{
                return(
                  <div className='card' key={element._id}>
                  <div className='content'>
                  <div className='short_fields'>
                    <div>
                    <span>Title:</span>
                    <input type="text" disabled={editing!==element._id ? true: false} value={element.title} onChange={(e)=>{
                      handleinputchanges(element._id, "title", e.target.value)
                    }}/>
                    </div>

                    <div>
                    <span>Country:</span>
                    <input type="text" disabled={editing!==element._id ? true: false} value={element.country} onChange={(e)=>{
                      handleinputchanges(element._id, "country", e.target.value)
                    }}/>
                    </div>

                    <div>
                    <span>City:</span>
                    <input type="text" disabled={editing!==element._id ? true: false} value={element.city} onChange={(e)=>{
                      handleinputchanges(element._id, "city", e.target.value)
                    }}/>
                    </div>

                    <div>
                    <span>Country:</span>
                    <select value={element.category} onChange={(e)=>handleinputchanges(element._id, "category", e.target.value)}
                      disabled={editing!==element._id ? true: false} >
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
                    <div>
                      <span>Salary:{element.fixedsalary} ? 
                      <input type="number"
                        value={element.fixedsalary} onChange={(e)=>handleinputchanges(element._id, "fixedsalary", e.target.value)}
                      disabled={editing!==element._id ? true: false}
                      /> :
                       <div>
                       <input type="number"
                        value={element.salaryfrom} onChange={(e)=>handleinputchanges(element._id, "salaryfrom", e.target.value)}
                      disabled={editing!==element._id ? true: false}
                      /> 

                        <input type="number"
                        value={element.salaryto} onChange={(e)=>handleinputchanges(element._id, "salaryto", e.target.value)}
                      disabled={editing!==element._id ? true: false}
                      /> 
                       </div>
                       </span>
                    </div>

                    <div>
                      <span>Expired:</span>
                      <select value={element.expired} onChange={(e)=>handleinputchanges(element._id, "expired", e.target.value)}
                      disabled={editing!==element._id ? true: false}>
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                    </div>
                  </div>

                  <div className='long_field'>
                    <div>
                      <span>Description:</span>
                      <textarea rows="5" value={element.description} onChange={(e)=>handleinputchanges(element._id, "description", e.target.value)}
                      disabled={editing!==element._id ? true: false}>
                      </textarea>
                    </div>

                    <div>
                      <span>Location:</span>
                      <textarea rows="5" value={element.location} onChange={(e)=>handleinputchanges(element._id, "location", e.target.value)}
                      disabled={editing!==element._id ? true: false}>
                      </textarea>
                    </div>

                  </div>
                  </div>

                  <div className='button_wrapper'>
                    <div className='edit_btn_wrapper'>
                      {
                        editing===element._id ? (<>
                        <button onClick={()=>handleupdatejobs(element._id)} className='check_btn'><FaCheck/></button>
                        <button onClick={()=>handledisableedit()} className='cross_btn'><RxCross2/></button>
                        </>) : (
                          <button onClick={()=>handleenableedit(element._id)} className='edit_btn'>Edit</button>
                        )
                      }
                    </div>

                    <button onClick={()=>handledeletejobs(element._id)} className='delete_btn'>Delete</button>
                  </div>
                  </div>
                )
              })
            }
          </div>
        </> 
        : <p>You have not posted any job or maybe you have deleted all your jobs</p>
      }
     </div>
    </div>
  )
}

export default Myjobs