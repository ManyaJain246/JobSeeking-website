import React, { useContext, useState } from 'react';
import {Context} from "../../main";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setshow]=useState(false);
  const {isAuthorized, setisAuthorized, user}=useContext(Context);
  const navigateTo=useNavigate();
  const handlelogout=async()=>{
    try{
      const response=await axios.get("http://localhost:4000/api/v1/user/logout", {withCredentials:true});
      toast.success(response.data.message);
      setisAuthorized(false);
      navigateTo("/login");
    }
    catch(error){
      toast.error(error.response.data.message);
      setisAuthorized(true);
    }
  }
  return (
    <nav className={isAuthorized? "navbarshow": "navbarhide"}>
       <div className='container'>
        <div className='logo'>
          <img src="/JobZee-logos__white.png" alt="logo"/>
        </div>
        <ul className={!show?'menu':"show-menu menu"}>
        <li>
          <Link to={"/"} onClick={()=>setshow(false)}>HOME</Link>
        </li>

        <li>
          <Link to={"/job/getall"} onClick={()=>setshow(false)}>ALL JOBS</Link>
        </li>

        <li>
          <Link to={"/application/me"} onClick={()=>setshow(false)}>
            {
              user && user.role==="Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"
            }
          </Link>
        </li>

        {
          user.role==="Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={()=>setshow(false)}>POST NEW JOB</Link>
              </li>

              <li>
                <Link to={"/job/me"} onClick={()=>setshow(false)}>VIEW YOUR JOBS</Link>
              </li>
            </>
          ):(
            <></>
          )
        }
        <button onClick={handlelogout}>LOGOUT</button>
        </ul>
        <div className='hamburger'>
          <GiHamburgerMenu onClick={()=>setshow(!show)}/>
        </div>
       </div>
    </nav>
  )
}

export default Navbar