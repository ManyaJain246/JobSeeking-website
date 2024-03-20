import React, { useContext } from 'react'
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import Herosection from "./Herosection";
import Howitworks from "./Howitworks";
import Popularcategories from "./Popularcategories";
import Popularcompanies from "./Popularcompanies";

const Home = () => {
  const {isAuthorized}=useContext(Context);

  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }

  return (
    <section className='homePage home'>
        <Herosection/>
        <Howitworks/>
        <Popularcategories/>
        <Popularcompanies/>
    </section>
  )
}

export default Home