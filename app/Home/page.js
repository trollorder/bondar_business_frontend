'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { Typography } from '@mui/material';
import Graph from "../../assets/graph.jpg"
import Image from 'next/image';
import Placeholderimage from "../components/Placeholderimage"


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

    const analyticHeaders ={'numberOfCustomers' : "Customers", 'impressions' :"Impressions", 'conversionRate' : "Conversion Rate", 'repeatCustomers': "Repeat Customer", 'totalMeetUps': "Total Meetups", 'averageDuration' : "Avg. Duration"}  
    return (
    <div className='py-20 bg-primary'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <div>
          <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Latest Places Around Your Business</Typography>
          <div>
            <Placeholderimage />
          </div>
          <div>
          <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Historical Business Insights</Typography>
            <div className='flex flex-wrap mb-10 w-full justify-center'>
                {Object.keys(analyticHeaders).map((key) => (
                  <div key={key} className='text-center m-2 bg-secondary p-4 rounded-lg overflow-auto w-1/2.5' style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Circle */}
                    <div className='border-2 bg-white border-black rounded-xl w-32 h-32 flex items-center justify-center' style={{ borderRadius: '50%' }}>
                      <span style={{ fontWeight: 'bold', fontSize: 'xx-large' }}>{insightDict[key]}</span>
                    </div>
                    {/* Boundary Line */}
                    <hr style={{ width: '80%', borderTop: '2px solid black', margin: '8px 0' }} />
                    {/* Analytic Header */}
                    <Typography className='w-full px-1 text-wrap' style={{ paddingTop: '6px', fontWeight: 'bold', fontSize: 'larger' }}>{analyticHeaders[key]}</Typography>
                  </div>
                ))}
              </div>

            <div>
              <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Graphs and Charts</Typography>
              <div className="flex justify-center">
                <Image src={Graph} className=' border-black rounded-xl border-2 w-80.5 h-auto'/>
              </div>
            </div>
          </div>
        </div>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default Page;