'use client'
import React from 'react'
import Packagebox from '../components/Packagebox'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import { Button } from '@mui/base'
import Billing from '../components/Billing';
import TopHeader from '../components/Topheader'
import SimpleBottomNavigation from '../components/Bottomnav'
import axios from 'axios'
import { Typography } from '@mui/material'


const page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState(null);
    const [userEmail, setUserEmail] = useState(
        () => {
          if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('userEmail') || 'NoEmail';
          } else {
            return 'NoEmail';
          }
        }
      )
    const [selectedCatalogObj, setSelectedCatalogObj] = useState(null)
    const [userDict ,setUserDict] = useState(null)
    const [fullPackageObjData , setFullPackageObjData] = useState(null)
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
            const businessId = response.data.squareUserId
            setUserDict(response.data)
            getCards(businessId)
        })
        .catch((error)=>{
        console.log(error)
        })
    },[])

    useEffect(() => {
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
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    function getCards(businessId) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/list-cards` , {params:{squareUserId:businessId}})
        .then((response) =>{
            setCards(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    function userSelectsObject(packageMongoDbId){
      const mongoObj = fullPackageObjData.mongoDbObjects.find((eachObj) => eachObj.id === packageMongoDbId)
      const squareObj = fullPackageObjData.squareObjects.find((eachObj) => eachObj.id === mongoObj.squareCatalogObjectId)
      const selectedCatalogObj = {...squareObj,...mongoObj}
      console.log(selectedCatalogObj)
    }

  return (
    <div className='py-20'>
        <TopHeader />
        {/* <Packagebox /> */}
        <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            
            <Typography variant='h5'>Complete Package Upgrade Payment</Typography>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Tiers</h3>
                <Button onClick={toggleDropdown}>Toggle Dropdown</Button>
                {isOpen && (
                    <div style={{ border: '1px solid black', marginTop: '5px' }}>
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                    </div>
                )}
            </div> */}
            {/* Require Package Name Here */}
            <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
                <div>
                    Package Selected
                </div>
            </Box>
            
            {cards && <Billing cardDetails={cards[0]} isDisplay={false} catalogObject={selectedCatalogObj} userDict={userDict}/>}
            
        </Box>
        
        
        <SimpleBottomNavigation/>

    </div>
  )
}

export default page