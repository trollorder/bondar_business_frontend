'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import Demographics from "./components/demographics"
import Duration from './components/duration';

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
    <div className='py-20'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <Typography>
          <div>
            <h2>User Demographics</h2>
            <Demographics male={male} female={female} binary={binary}/>
          </div>

          <div>
            <h2>Duration</h2>
            {/* <Image src={duration} /> */}
            <Duration timeDurationDict={timeDurationDict}/>
          </div>

          <div>
            <h2>Insights and Recommendation</h2>
            <Container>
              {Object.keys(insight).map((key) => (
                <div key={key}>
                  <Typography variant="body1">{insight[key]}</Typography>
                </div>
              ))}
            </Container>
          </div>
        </Typography>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page