'use client'
import React, { useState } from 'react'
import Login from '../components/Login'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Topdesign from '../components/Topdesign';

const page = () => {
    const router =  useRouter()
    async function onSubmitForm({userEmail,password}){
      console.log(userEmail,password)
      axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/business-user-login` , {userEmail : userEmail , password : password })
      .then((response)=>{
        if (response.status === 200) {
          window.localStorage.setItem('userEmail' , userEmail)
          router.push('/BusinessProfile')
        }
        else{
          toast.error('Invalid Login Credentials')
        }
      
      })
    }
  return (
    <div className='bg-primary h-screen overflow-auto'> 
      <ToastContainer/>
        <Login  onSubmitForm={onSubmitForm}/>
    </div>
  )
}

export default page