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
  const [packageDataID, setPackageDataID] = useState(null);
  const [packagePrice, setPackagePrice] = useState(null)

  useEffect(()=>{
    console.log(userEmail)
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail:userEmail}})
    .then((response)=>{
      setPackageDataID(response.data['currentPackageId']);
    })
    .catch((err)=>console.log(err))
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
    .then((response)=>{
      const packageObject = response.mongoDbObjects.find(obj => obj.squareCatalogObjectId === packageDataID);
      setPackagePrice(packageObject["price"])
      console.log(packageObject)
    })

  },[])
  

  return (
    <Box sx={{border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <div>Current Retainer Package</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>  
            <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
          {setPackagePrice && <div>
              {setPackagePrice}
          </div>}
            <Button>
                Upgrade
            </Button>
        </div>
    </Box>
  )
}

export default Packagebox