import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

const Howitworks = () => {
  return (
    <div className='howitworks'>
        <div className='container'>
            <h3>How jobzee works</h3>
            <div className='banner'>
                <div className='card'>
                    <FaUserPlus/>
                    <p>Create Account</p>
                    <p>Creating an account on our job-seeking website is your first step towards unlocking a world of career opportunities. With a simple and streamlined registration process, we make it easy for you to get started on your job search journey.</p>
                </div>

                <div className='card'>
                    <MdFindInPage/>
                    <p>Find a job/Post a job</p>
                    <p>"Find a Job": Explore diverse opportunities. Apply with ease.
                       "Post a Job": Connect with top talent. Streamline hiring.</p>
                </div>

                <div className='card'>
                    <IoMdSend/>
                    <p>Post Applications</p>
                    <p>Share your resume and cover letter with ease. Apply to jobs seamlessly. Let employers discover your talents effortlessly. Your career journey starts here.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Howitworks