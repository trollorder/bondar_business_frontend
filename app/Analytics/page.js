'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import Demographics from "./components/demographics"
import Duration from './components/duration';

const Page = () => {  
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
    const [male ,setMale] = useState(null)
    const [female ,setFemale] = useState(null)
    const [binary ,setBinary] = useState(null)
    const [timeDurationDict, setTimeDurationDict] = useState({});
    const [insight, setInsight] = useState({})
    useEffect(()=>{
      if (userDict) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-base-business-metrics-for-user` , {params:{businessUserId : userDict['_id']}})
        .then( (response) =>{
          setMale(response.data.totalMale)
          setFemale(response.data.totalFemale)
          setBinary(response.data.totalNonBinary)
          setTimeDurationDict(response.data.timeDurationDict);
        })

        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-insights-for-user` , {params:{businessUserId : userDict['_id']}})
        .then( (response) =>{
          setInsight(response.data)
        })
      
        .catch((error)=>{
          console.log(error)
        })}
    },[userDict])

    
  return (
    <div className='py-20 bg-primary'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <Typography variant='h5' className='px-4 mt-2 font-title' style={{fontWeight:'bolder'}}>User Demographics</Typography>
          <div className='bg-white rounded-xl m-2 p-2'>
            <Demographics className='m-2 rounded-xl' male={male} female={female} binary={binary}/>
          </div>
          <Typography variant='h5' className='px-4 mt-2 font-title' style={{fontWeight:'bolder'}}>Duration</Typography>
          <div className='bg-white rounded-xl m-2 p-2'>
            <Duration timeDurationDict={timeDurationDict}/>
          </div>
          <Typography variant='h5' className='px-4 mt-2 font-title' style={{fontWeight:'bolder'}}>Insights and Recommendations</Typography>
          <div className='bg-white rounded-xl m-2 px-4 pt-8 flex flex-col space-y-2 pb-10'>
            <Typography variant='h6' className=' mb-2 font-title' style={{fontSize:'1rem', fontWeight:'bold'}}>Duration Recommendation</Typography>
            <Typography variant="body1">{insight.durationRecommendation}</Typography>
            <Typography variant='h6' className=' mb-2 font-title' style={{fontSize:'1rem', fontWeight:'bold'}}>Conversion Rate Recommendation</Typography>
            <Typography variant="body1">{insight.conversionRateRecommendation}</Typography>
            <Typography variant='h6' className=' mb-2 font-title' style={{fontSize:'1rem', fontWeight:'bold'}}>Meetup Recommendation</Typography>
            <Typography variant="body1">{insight.meetUpRecommendation}</Typography>
          </div>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default Page