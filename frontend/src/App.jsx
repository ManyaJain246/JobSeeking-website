import React, {useEffect, useContext} from 'react';
import "./App.css";
import {Context} from "./main";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import Jobdetails from "./components/Job/Jobdetails";
import Myjobs from "./components/Job/Myjobs";
import Postjobs from "./components/Job/Postjobs";
import Application from "./components/Application/Application";
import Myapplications from "./components/Application/Myapplications";
import Notfound from "./components/Notfound/Notfound";
import axios from "axios";                                   // Axios is a popular JavaScript library used for making HTTP requests from web browsers and Node.js applications. In the context of React, Axios is commonly used for making API requests from React components.
import {Toaster} from "react-hot-toast";                     // "react-hot-toast" is a React library for displaying toast notifications in web applications. Toast notifications are non-intrusive messages that appear temporarily on the screen to provide feedback or information to the user.


const App = () => {

  const {isAuthorized, setisAuthorized, setuser}=useContext(Context);

  useEffect(()=>{              // useEffect=whenever page refreshes or value changes it works
   const fetch=async()=>{
        try{
          const response= await axios.get("http://localhost:4000/api/v1/user/getuser", {withCredentials:true})
          setuser(response.data.user)
          setisAuthorized(true)
      }
    catch(error){
     setisAuthorized(false)               // if doesn't get the user means not authorized
    }
  };
  fetch()
  }, [isAuthorized])                     // whenever isAuthorized value changes, useEffect will run

  // if(isAuthorized){
  //   return <Navigate to ={"/"}/>         // if user is authorized sent him to home page
  // }

  return (
    <>
    <Router>   
    <Navbar />                            
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/job/getall" element={<Jobs/>}></Route>
        <Route path="/job/:id" element={<Jobdetails/>}></Route>
        <Route path="/job/post" element={<Postjobs/>}></Route>
        <Route path="/job/me" element={<Myjobs/>}></Route>
        <Route path="/application/:id" element={<Application/>}></Route>
        <Route path="/application/me" element={<Myapplications/>}></Route>
        <Route path="*" element={<Notfound/>}></Route>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
    </>
  )
}

export default App