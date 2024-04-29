'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SimpleBottomNavigation from '../components/Bottomnav'
import TopHeader from '../components/Topheader'
import StandardInvoice from '../PaymentComponents/StandardInvoice'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter();
  const [invoices,setInvoices] = useState(null)
  const [userEmail, setUserEmail] = useState(
      () => {
        if (typeof window !== 'undefined' && window.localStorage) {
          return localStorage.getItem('userEmail') || 'NoEmail';
        } else {
          return 'NoEmail';
        }
      }
    )
  const [userDict ,setUserDict] = useState(null)
  useEffect(()=>{
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
      .then( (response) =>{
          const businessId = response.data.squareUserId
          setUserDict(response.data)
          getInvoices(businessId)
      })
      .catch((error)=>{
      console.log(error)
      })
  },[])
  function getInvoices(businessId){
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-invoices` , {params:{squareUserId:businessId}})
    .then((response) =>{
        setInvoices(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
  return (
    <div className='py-20'>
        <TopHeader />
        {invoices && <StandardInvoice invoice={invoices[0]}/>}
        <div className='w-full flex items-center justify-center'>
         <Button variant='contained' color='success' onClick={() => router.push('/Home')}>Confirm</Button>

        </div>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page