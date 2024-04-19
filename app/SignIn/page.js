'use client'
import React, { useState } from 'react'
import Login from '../components/Login'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const page = () => {
    const router =  useRouter()
    function onSubmitForm(){
        toast.success('Account Created')
        router.push('/Home')
    }
  return (
    <div>
        <Login  onSubmitForm={onSubmitForm}/>
    </div>
  )
}

export default page