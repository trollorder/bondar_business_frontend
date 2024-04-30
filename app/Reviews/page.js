'use client'
import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import axios from 'axios';
import ReviewBox from '../components/Reviewbox';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';

const page = () => {
    // get all reviews and display it 
    const [userDict , setUserDict] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [userEmail, setUserEmail] = useState(
        () => {
          if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('userEmail') || 'NoEmail';
          } else {
            return 'NoEmail';
          }
        }
      )
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
            setUserDict(response.data)
            getReviews(response.data._id)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])

    function getReviews(businessId){
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-all-user-reviews-for-business` ,{params:{businessId : businessId}})
        .then((response) =>{
            setReviews(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className='py-20 bg-primary'>
          {userDict && <TopHeader businessName={userDict.companyName}/>}
          <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Reviews</Typography>
          {reviews && <ReviewBox reviews={reviews}/>}
          <SimpleBottomNavigation/>
        </div>
    )
}

export default page