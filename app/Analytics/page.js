'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { Typography } from '@mui/material';
import Image from 'next/image';
import duration from "../../assets/duration.jpg"
import demographic from "../../assets/demographics.jpg"
import Box from '@mui/material';

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
        <Typography>
          <div>
            <h2>User Demographics</h2>
            <Image src={demographic} />
          </div>

          <div>
            <h2>Duration</h2>
            <Image src={duration} />
          </div>

          <div>
            <h2>Insights and Recommendation</h2>
            <div>Insight 1</div>
            <div>Insight 2</div>
            <div>Insight 3</div>
          </div>
        </Typography>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page