'use client'
import React, { useState } from 'react'
import Createaccount from '../components/Createaccount'
import Createbusinessinfo from '../components/Createbusinessinfo'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from 'axios'

const Page = () => {
  const [tab,setTab]  = useState(0)
  const router =  useRouter()
  const [submitForm, setSubmitForm] = useState({})
  function onSubmitForm(){
    toast.success('Account Created')
    router.push('/Home')
    // axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-new-business-account` , submitForm)
    axios.post('http://localhost:8080/create-new-business-account', submitForm)
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  }
  return (
    <div>
        <ToastContainer/>
        {tab=== 0 ?
        <Createaccount  setTab={setTab} setSubmitForm={setSubmitForm} submitForm={submitForm}/>
        :
        <Createbusinessinfo setTab={setTab}  onSubmitForm={onSubmitForm} setSubmitForm={setSubmitForm} submitForm={submitForm} />}
    </div>
  )
}

export default Page;