'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
function playground(){
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
    return(
        <div className='py-20'>
            {userDict && <TopHeader businessName={userDict.companyName}/>}
            <div>  
              {/* Main Component Display */}
              <Typography variant='h6'>This is the Loyalty Programmes Page</Typography>
            </div>
            <SimpleBottomNavigation/>
        </div>
    )
}
export default playground;