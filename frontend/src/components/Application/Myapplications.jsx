import React, { useContext, useState, useEffect} from 'react';
import Resumemodel from './Resumemodel';
import {Context} from "../../main";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

const Myapplications = () => {
  const[applications, setapplications]=useState([]);
  const[modalopen, setmodalopen]=useState(false);
  const[resumeimageurl, setresumeimageurl]=useState("");
  const {isAuthorized, user}=useContext(Context);

  const navigateTo=useNavigate();

  useEffect(()=>{
    try{
       if(user && user.role==="Employer"){
        axios.get("http://localhost:4000/api/v1/application/employer/getall", {withCredentials:true,})
        .then((res)=>{
          setapplications(res.data.applications);
        })
       }else{
        axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", {withCredentials:true,})
        .then((res)=>{
          setapplications(res.data.applications);
        })
       }
    }catch(error){
      toast.error(error.response.data.message);
    }
  }, [isAuthorized])          // jb jb isAuthorized ki value change hogi tb tb yaha pr changes krne h

  if(!isAuthorized){
    navigateTo("/")
  }

  const deleteapplication= (id)=>{
    try{
       axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {withCredentials:true,})
      .then((res)=>{
        toast.success(res.data.message);
        setapplications(prevApplication=>{
          prevApplication.filter((application)=>application._id!==id)
        })
      })
    }catch(error){
       toast.error(error.response.data.message)
    }
  }

  const openmodal=(imageUrl)=>{
    setresumeimageurl(imageUrl);
    setmodalopen(true);
  };

  const closemodal=()=>{
      setmodalopen(false);
  }


  return (
    <section className='my_applications page'>
        {
          user && user.role==="Job Seeker" ? (
          <div className="container">
          <h3>My Applications</h3>
          {applications.length <=0 ? (
            <>
            {" "}
            <h4>No Application Found</h4>
            {" "}
          </>
          ) : (
            applications.map((element)=>{
              return (
                <JobSeekerCard element={element} key={element._id} deleteapplication={deleteapplication} openmodal={openmodal}/>
            );
            })
          )}
          </div>
          ) : (
          <div className="container">
          <h3>Applications from Job Seeker</h3>
          {
            applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element)=>{
              return(
                <EmployerCard element={element} key={element._id}  openmodal={openmodal}/>
              ) 
            })
            )}
          </div>
          )}
          {
            modalopen && (
              <Resumemodel imageUrl={resumeimageurl} onClose={closemodal}/>
            )
          }
    </section>
  )
}

export default Myapplications

const JobSeekerCard=({element, deleteapplication, openmodal})=>{
  return(
    <>
      <div className='job_seeker_card'>
        <div className='detail'>
          <p>
            <span>Name:</span>
            {element.name}
          </p>

          <p>
            <span>Email:</span>
            {element.email}
          </p>

          <p>
            <span>Address:</span>
            {element.address}
          </p>

          <p>
            <span>Phone:</span>
            {element.phone}
          </p>

          <p>
            <span>Coverletter:</span>
            {element.coverletter}
          </p>
        </div>

        <div className='resume'>
          <img src={element.resume.url} alt="resume" onClick={()=>openmodal(element.resume.url)}/>
        </div>

        <div className='btn_area'>
          <button onClick={()=>deleteapplication(element._id)}>Delete Application</button>
        </div>
      </div>
    </>
  )
};

const EmployerCard=({element, openmodal})=>{
  return(
    <>
       <div className='job_seeker_card'>
        <div className='detail'>
          <p>
            <span>Name:</span>
            {element.name}
          </p>

          <p>
            <span>Email:</span>
            {element.email}
          </p>

          <p>
            <span>Address:</span>
            {element.address}
          </p>

          <p>
            <span>Phone:</span>
            {element.phone}
          </p>

          <p>
            <span>Coverletter:</span>
            {element.coverletter}
          </p>
        </div>

        <div className='resume'>
          <img src={element.resume.url} alt="resume" onClick={()=>openmodal(element.resume.url)}/>
        </div>
      </div>
    </>
  )
}