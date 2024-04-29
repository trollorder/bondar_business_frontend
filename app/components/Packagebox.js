'use client'
import React from 'react'
import Image from 'next/image';
import profileImag from "../../assets/logo.jpg"
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Packagebox = () => {
  const router = useRouter();
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
  const [fullPackageObjData , setFullPackageObjData] = useState(null)

  useEffect(()=>{
    console.log(userEmail)
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail:userEmail}})
    .then((response)=>{
      setPackageDataID(response.data.currentPackageId);
    })
    .catch((err)=>console.log(err))
  },[])

  useEffect(() => {
    console.log(packageDataID); // This will log the updated value when packageDataID changes
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
    .then((response) => {
      setFullPackageObjData(response.data)
      const mongoDbObjects = response.data.mongoDbObjects;
      const packageObject = mongoDbObjects.find(obj => obj._id === packageDataID);
      if (packageObject) {
        // this part is to get only the name
        setPackagePrice(packageObject.price);
      } 
    })
    .catch((error) => {
      console.log(error);
    });
  }, [packageDataID]);

  // Select a PackageObject and Format The CatalogDict by Concatenating Both SquareObj and also the mongoDBObject
  function setSelectedCatalogObj(packageMongoDbId){
    const mongoObj = fullPackageObjData.mongoDbObjects.find((eachObj) => eachObj.id === packageMongoDbId)
    const squareObj = fullPackageObjData.squareObjects.find((eachObj) => eachObj.id === mongoObj.squareCatalogObjectId)
    const selectedCatalogObj = {...squareObj,...mongoObj}
    console.log(selectedCatalogObj)
  }

  

  return (
    <Box sx={{border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <div>Current Retainer Package</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>  
            <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
              <div>${packagePrice}/month</div>
            <Button onClick={() => router.push('/BusinessUpgrade')}>
                Upgrade
            </Button>
        </div>
    </Box>
  )
}

export default Packagebox