'use client'
import Packagebox from '../components/Packagebox'
import Button from '@mui/material/Button';
import Pricingtable from '../components/Pricingtable'
import Testing from '../components/Testing'


import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';

const page = () => {
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
          setUserDict(response.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])
  return (
    <div className='py-20'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <Packagebox />
        <Button variant="contained" style={{display: 'flex', justifyContent: 'center'}}>View Invoices</Button>
        {/* <Pricingtable /> */}
        <Testing />
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page