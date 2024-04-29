'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { Typography } from '@mui/material';
import Graph from "../../assets/graph.jpg"
import Image from 'next/image';

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
        <div>
          <h2>Latest Places Around Your Businesses</h2>
          <div>
            Images
          </div>
          <div>
            <h1>Historical Business Insights</h1>
            <div className='flex flex-wrap gap-20 mb-10'>
              <div>Insight 1</div>
              <div>Insight 2</div>
              <div>Insight 3</div>
              <div>Insight 4</div>
              <div>Insight 5</div>
              <div>Insight 6</div>
            </div>

            <div>
              <h2>Graph and Charts</h2>
              <Image src={Graph} />
            </div>
          </div>
        </div>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page