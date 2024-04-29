'use client'
import React from 'react'
import { Box, Typography, List, ListItem, ListItemText, Collapse, Select, MenuItem, Menu} from '@mui/material'
import { useState, useEffect } from 'react'
import Billing from '../components/Billing';
import TopHeader from '../components/Topheader'
import SimpleBottomNavigation from '../components/Bottomnav'
import axios from 'axios'


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
    const [packageId, setPackageId] = useState('')
    const [userDict ,setUserDict] = useState(null)
    const [fullPackageObjData , setFullPackageObjData] = useState(null)
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
            const businessId = response.data.squareUserId
            setUserDict(response.data)
            getCards(businessId)
            getCatalogObjects(response.data)
        })
        .catch((error)=>{
        console.log(error)
        })
    },[])

    function getCatalogObjects(localUserDict) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
      .then((response) => {
        setFullPackageObjData(response.data)
        const mongoDbObjects = response.data.mongoDbObjects;
        const packageObject = mongoDbObjects.find(obj => obj._id === localUserDict.currentPackageId);
        console.log('package obj is ' , packageObject)
        setPackageId(packageObject.squareCatalogObjectId)
      })
      .catch((error) => {
        console.log(error);
      });
    }

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
    function userSelected(packageMongoDbId){
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {fullPackageObjData && packageId && 
                  <Select value={fullPackageObjData.squareObjects.find((eachObj) => eachObj.id === packageId) ? fullPackageObjData.squareObjects.find((eachObj) => eachObj.id === packageId) : null } className='w-full'>
                    {fullPackageObjData.mongoDbObjects.map((mongoDbCatalogObj)=>(
                      <MenuItem value={mongoDbCatalogObj.squareCatalogObjectId} key={mongoDbCatalogObj.squareCatalogObjectId} onChange={(e) => {setPackageId(e.target.value);console.log(packageId)}}>{mongoDbCatalogObj.itemName}</MenuItem>
                     ))}
                </Select>
              }
            </div>
              {/* Display Package Details Here */}
            {selectedCatalogObj && 
              <div>
                
              </div>
            }
  
            
            {cards && packageId && <Billing cardDetails={cards[0]} isDisplay={false} catalogObject={selectedCatalogObj} userDict={userDict}/>}
            
        </Box>
        
        
        <SimpleBottomNavigation/>

    </div>
  )
}

export default page