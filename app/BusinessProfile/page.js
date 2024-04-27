'use client'
import React, { useEffect, useState } from 'react';
import SimpleBottomNavigation from '../components/Bottomnav';
import TopHeader from '../components/Topheader';
import ProfileBox from '../components/Profilebox.js';
import MediaBox from '../components/Mediabox';
import ReviewBox from '../components/Reviewbox';
import LoyaltyBox from '../components/Loyaltybox';
import axios from 'axios';

const BusinessProfilePage = () => {
  // State for managing edit mode
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

  function uploadGeneralMediaPhotos() {

  }

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

  return (
    <div className='py-20'>
      <TopHeader businessName={"Cafe Lincoln"} />

      <ProfileBox editMode={editMode} userEmail={userEmail} toggleEditMode={toggleEditMode} businessAddress={"1626 Kains"} businessName={"Cafe Lelia"} />

      {generalMediaUrls && <MediaBox key={refresh}  userEmail={userEmail} editMode={editMode} toggleEditMode={toggleEditMode} generalMediaUrls={generalMediaUrls} onDeleteImage={onDeleteImage} />}

      {reviews && <ReviewBox key={refresh} reviews = {reviews} />}

      <LoyaltyBox />
      
      <SimpleBottomNavigation />
    </div>
  );
};

export default BusinessProfilePage;
