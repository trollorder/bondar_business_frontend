'use client'
import React from 'react'
import { Box, Typography, Select, MenuItem, Button, Tab, Tabs, CardContent, Card , ListItem, ListItemText} from '@mui/material'
import { useState, useEffect } from 'react'
import TopHeader from '../components/Topheader'
import SimpleBottomNavigation from '../components/Bottomnav'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import StandardCardDetails from '../PaymentComponents/StandardCardDisplay';
import SelectedPlanCard from '../components/SelectedPlanDetails';

const page = () => {
    const router = useRouter();
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
    const [selectedCatalogObjSquareId, setSelectedCatalogObjSquareId] = useState(null)
    const [currentPackageId, setCurrenPackageId] = useState(null)
    const [packageId, setPackageId] = useState('')
    const [userDict ,setUserDict] = useState(null)
    const [fullPackageObjData , setFullPackageObjData] = useState(null)
    const [activeTab, setActiveTab] = useState();
    const handleChange = (event, newActiveTab) => {
      setActiveTab(newActiveTab);
    };
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
        setSelectedCatalogObjSquareId(packageObject.squareCatalogObjectId)
        setCurrenPackageId(packageObject.squareCatalogObjectId)
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
    function handleSelectChange(e){
      console.log(e.target.value)
      setSelectedCatalogObjSquareId(e.target.value)
    }

    function handleSelectCard(cardId){
      return
    }

  return (
    <div className='py-20'>
        <TopHeader />
        {/* <Packagebox /> */}
        <Box sx={{maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            
            <Typography variant='h5'>Select A Package To Upgrade</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {fullPackageObjData && selectedCatalogObjSquareId && 
                <Select className='w-full' value={selectedCatalogObjSquareId}  onChange={(e)=> handleSelectChange(e)}>
                  {fullPackageObjData.mongoDbObjects.map((eachPackage) => (
                    <MenuItem value={eachPackage.squareCatalogObjectId}>{eachPackage.itemName}</MenuItem>
                  ))}
                </Select>
              }
            </div>
              {/* Display Package Details Here */}
            {selectedCatalogObjSquareId&& fullPackageObjData && 
              <div>
                {fullPackageObjData.mongoDbObjects.filter((eachItem) => eachItem.squareCatalogObjectId === selectedCatalogObjSquareId).map((catalogObject)=>(
                  <SelectedPlanCard catalogObject={catalogObject}/>
                ))}
              </div>
            }
              
            {/* Select A Card Her */}
            {cards && 
              <div className='w-full overflow-x-auto shadow-xl rounded-sm'>
                <Typography variant='caption' style={{fontWeight:'bold'}}>Choose a Card</Typography>
                <Tabs onChange={handleChange} value={activeTab}>
                  {cards.map((eachCard)=>(
                    <Tab label={eachCard.last4} value={eachCard.id} />
                  ))}
                </Tabs>
                {cards.map((eachCard) => (
                  <div>
                    {activeTab === eachCard.id && <div>
                      <StandardCardDetails card={eachCard} isDisplay={true} key={eachCard.id} />
                      <Button className='self-center' variant='contained' color='success' onClick={() => handleSelectCard(eachCard.id)}>Select Card and Pay</Button>
                    </div>
                    }
                  </div>
                ))}
              </div>

              
            }

            {/* Don't Show if user no change selection from current plan */}
            {selectedCatalogObjSquareId !== currentPackageId && <Button onClick={() => router.push('/BusinessUpgradeConfirmation')} variant='contained' color='success'>Confirm Order and Pay Now</Button>}
        </Box>

        
        <SimpleBottomNavigation/>

    </div>
  )
}

export default page