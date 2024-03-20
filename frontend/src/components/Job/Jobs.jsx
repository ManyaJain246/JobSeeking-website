import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Jobs = () => {
  const [jobs, setjobs]=useState([]);
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try{
      axios.get("http://localhost:4000/api/v1/job/getall", {withCredentials:true})
      .then((res)=>{
       setjobs(res.data)
      })
    }catch(error){
      console.log(error);
    }
  },[])

  if(!isAuthorized){
    navigateTo("/login");
  }

  return (
    <section className='jobs page'>
      <div className='container'>
        <h2>All Available Jobs</h2>
        <div className='banner'>
          {
            jobs.jobs && jobs.jobs.map((element)=>{        // if jobs are available in jobs section
             return(
              <div className='card' key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
             )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Jobs