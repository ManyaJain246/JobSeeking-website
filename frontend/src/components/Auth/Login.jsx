import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from "axios";
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom";
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline} from 'react-icons/md';
import { FaPhoneFlip} from 'react-icons/fa6';
import { RiLock2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setemail]=useState("");
  const [password, setpassword]=useState("");
  const [role, setrole]=useState("");

  const {isAuthorized, setisAuthorized}=useContext(Context);

  const handlelogin=async(e)=>{
    e.preventDefault();
    try{
    const {data}=await axios.post(
    "http://localhost:4000/api/v1/user/login", 
    {email, password, role}, 
    {
      withCredentials:true, 
      headers:{
      "Content-Type":"application/json",
      },
    }
   );
   toast.success(data.massage);
   // emptying all fields after registering
   setrole("");
   setpassword("");
   setemail("");
   setisAuthorized(true);
    }catch(error){
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
        <div className='authPage'>
          <div className='container'>
            <div className='header'>
              {/* <img src="" alt="logo"/> */}
              <h3> Login to your account</h3>
            </div>
            <form>
              <div className='inputTag'>
                <label>Login as</label>
              <div>
              <select value={role} onChange={(e)=>setrole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser/>
              </div>
              </div>

              <div className='inputTag'>
                <label>Email</label>
              <div>
              <input type="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
              <MdOutlineMailOutline/>
              </div>
              </div>

              <div className='inputTag'>
                <label>Password</label>
              <div>
              <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
              <RiLock2Fill/>
              </div>
              </div>
              <button onClick={handlelogin} type="submit">Login</button>
              <Link to={"/register"}>Register Now</Link>
            </form>
          </div>
          <div className='banner'>
            <img src="/login.png" alt="login"/>
          </div>
        </div>
    </>
  )
}

export default Login