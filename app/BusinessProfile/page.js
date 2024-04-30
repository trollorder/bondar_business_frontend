'use client'
import React, { useEffect, useState } from 'react';
import SimpleBottomNavigation from '../components/Bottomnav';
import TopHeader from '../components/Topheader';
import ProfileBox from '../components/Profilebox.js';
import MediaBox from '../components/Mediabox';
import ReviewBox from '../components/Reviewbox';
import axios from 'axios';
import { Box, Button, Typography} from '@mui/material';
import { useRouter } from 'next/navigation';


const BusinessProfilePage = () => {
  // State for managing edit mode
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [userEmail, setUserEmail] = useState(
    () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('userEmail') || 'NoEmail';
      } else {
        return 'NoEmail';
      }
    }
  )
  const [ businessId , setBusinessId] = useState(null)
  const [userDict ,setUserDict] = useState(null)
  const [generalMediaUrls , setGeneralMediaUrls] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [refresh, setRefresh] = useState(null)
  // Handler for toggling edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
    .then( (response) =>{
      setUserDict(response.data)
      setBusinessId(response.data._id)
      console.log(response.data)
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-3-user-reviews-for-business` , {params:{businessId: response.data._id}})
      .then((response) =>{
        setReviews(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    })
    .catch((error)=>{
      console.log(error)
    })
    // get Existing general Media
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-businessuser-image-by-type` , {params:{userEmail : userEmail,imageType:"generalMedia" }}) 
    .then((response)=>{
      const listofUrlExtensions = response.data.imageList
      const generalMediaUrls = listofUrlExtensions.reduce((acc, eachItem) => {
        return [...acc, `${process.env.NEXT_PUBLIC_CLOUDINARY_DISPLAY_URL}/${eachItem}`];
      }, []);    
      setGeneralMediaUrls(generalMediaUrls)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[refresh])

  function onDeleteImage(Url){
    console.log('deleting' , Url)
    const decomposeNames = Url.split('/')
    const lastTwoElements = decomposeNames.slice(-2);
    const fullname = lastTwoElements.join('/')
    axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/delete-image` , {params:{userEmail:userEmail, imageId:fullname, imageType:'generalMedia'}})
    .then((response) =>{
      console.log(response)
    })
    .catch((error) =>{
      console.log(error)
    })
    setRefresh(!refresh)
  }

  function handleSaveProfile(){
    axios.put(`${process.env.NEXT_PUBLIC_BACKENDURL}/update-business-user-details` ,{
      businessId:userDict._id , 
      companyPriceLevel:userDict.companyPriceLevel, 
      companyMinorType:userDict.companyMinorType, 
      companyMajorType :userDict.companyMajorType
    })
    .then((response) =>{
      console.log(response)
      setRefresh(!refresh)
      setEditMode(!editMode)
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  return (
    <div className='py-14 bg-primary'>
      {userDict && <TopHeader businessName={userDict.companyName} />}

      <ProfileBox key={refresh} editMode={editMode} userEmail={userEmail} toggleEditMode={toggleEditMode} businessDetails={userDict} handleSaveProfile={handleSaveProfile} setBusinessDetails={setUserDict}/>

      {generalMediaUrls && <MediaBox userEmail={userEmail} editMode={editMode} toggleEditMode={toggleEditMode} generalMediaUrls={generalMediaUrls} onDeleteImage={onDeleteImage} />}
      <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Loyalty Programmes</Typography>
      <Box sx={{textAlign: 'center', maxWidth: '400px', margin: 'auto' }} className='mt-2 bg-white p-4 shadow-md rounded-xl'>
        <Typography variant='body2 mb-2'>Learn more about our loyalty program and rewards!</Typography>
        <Button className='py-3 px-10 font-body' type='small' variant='contained' onClick={() => router.push('/LoyaltyProgramme')} style={{backgroundColor:'black', color:'white'}}>Offer Loyalty Programmes</Button>
      </Box>
      <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Reviews</Typography>

      {reviews && <ReviewBox  reviews = {reviews} />}

      
      <SimpleBottomNavigation />
    </div>
  );
};

export default BusinessProfilePage;
