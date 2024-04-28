'use client'
import React from 'react'
import Image from 'next/image';
import profileImag from "../../assets/logo.jpg"
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Packagebox = () => {

  const [userEmail, setUserEmail] = useState(
    () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('userEmail') || 'NoEmail';
      } else {
        return 'NoEmail';
      }
    }
  )
  const [packageDataID, setPackageDataID] = useState('');
  const [packagePrice, setPackagePrice] = useState(null)

  useEffect(()=>{
    console.log(userEmail)
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail:userEmail}})
    .then((response)=>{
      console.log(response.data.currentPackageId)
      console.log(typeof response.data.currentPackageId)
      setPackageDataID(response.data.currentPackageId);
      console.log(packageDataID)
    })
    .catch((err)=>console.log(err))
  },[])

  useEffect(() => {
    console.log(packageDataID); // This will log the updated value when packageDataID changes
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
    .then((response) => {
      const mongoDbObjects = response.data.mongoDbObjects;
      const packageObject = mongoDbObjects.find(obj => obj._id === packageDataID);
      if (packageObject) {
        setPackagePrice(packageObject.price);
        console.log(packageObject);
      } else {
        console.log("Package not found");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [packageDataID]);
  

  return (
    <Box sx={{border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <div>Current Retainer Package</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>  
            <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
              <div>${packagePrice}/month</div>
            <Button>
                Upgrade
            </Button>
        </div>
    </Box>
  )
}

export default Packagebox