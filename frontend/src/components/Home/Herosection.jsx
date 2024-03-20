import React from 'react';
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";


const Herosection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className='heroSection'>
        <div className='container'>
          <div className='title'>
            <h2>Find a job that suits</h2>
            <h2>your interest and skills</h2>
            <p>Join our vibrant community of job seekers and employers today and take the next step towards a fulfilling career journey. Let us help you turn your career aspirations into reality.</p>
          </div>
          <div className='image'>
            <img src="/heroS.jpg" alt="hero"></img>
          </div>
        </div>
        <div className='details'>
          {details.map((element)=>{
            return(
              <div className='card' key={element.id}>
              <div className='icon'>{element.icon}</div>
              <div className='content'>
              <p>{element.title}</p>
              <p>{element.subTitle}</p>
              </div>
              </div>
            )
          })}
        </div>
    </div>
    
  )
}

export default Herosection