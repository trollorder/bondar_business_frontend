'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { Typography } from '@mui/material';
import Graph from "../../assets/graph.jpg"
import Image from 'next/image';
import imageplaceholder from "../../assets/imageplaceholder.jpg"
import Placeholderimage from "./components/Placeholderimage"


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
    
    const [insightDict, setInsightDict] = useState({})
    
    useEffect(()=>{
      if (userDict) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-base-business-metrics-for-user` , {params:{businessUserId : userDict['_id']}})
        .then( (response) =>{
          setInsightDict(response.data)
        })

        .catch((error)=>{
          console.log(error)
        })}
    },[userDict])

    const analyticHeaders =['numberOfCustomers', 'impressions', 'conversionRate', 'repeatCustomers', 'totalMeetUps', 'averageDuration']
  return (
    <div className='py-20'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <div>
          <h2>Latest Places Around Your Businesses</h2>
          <div>
            <Placeholderimage />
          </div>
          <div>
            <h1>Historical Business Insights</h1>
            <div className='flex flex-wrap space-x-5 mb-10 w-full justify-center'> 
              {analyticHeaders.map((key) => (
                <div className='text-center'> 
                  {/* Circle */} 
                  <div className='border-2 rounded-xl w-32 h-32 flex items-center justify-center' style={{borderRadius:'50%'}}> 
                    {insightDict[key]}
                  </div> 
                  <Typography>{key}</Typography> 
              </div>
              ))}
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