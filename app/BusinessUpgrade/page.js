'use client'
import React, { useCallback } from 'react'
import { Box, Typography, Select, MenuItem, Button, Tab, Tabs, CardContent, Card , ListItem, ListItemText} from '@mui/material'
import { useState, useEffect } from 'react'
import TopHeader from '../components/Topheader'
import SimpleBottomNavigation from '../components/Bottomnav'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import StandardCardDetails from '../PaymentComponents/StandardCardDisplay';
import SelectedPlanCard from '../components/SelectedPlanDetails';

const Page = () => {
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
    const [orderId, setOrderId] = useState(null)
    const handleChange = (event, newActiveTab) => {
      setActiveTab(newActiveTab);
      // Potential Break but is to persist to next page
      window.localStorage.setItem('selectedCard' , newActiveTab)
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
    function getCards(businessId) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/list-cards` , {params:{squareUserId:businessId}})
        .then((response) =>{
            setCards(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function handleSelectChange(e){
      console.log('square value : ' , e.target.value)
      setSelectedCatalogObjSquareId(e.target.value)
      // Potential Breaking Point
      window.localStorage.setItem('selectedCatalogObjSquarIdForPurchase' , e.target.value)
    }

    async function confirmOrder () {
      // To confirm order you first needto create an order item
      const orderId = await createNewOrder();
      console.log(orderId)
      const invoiceCreated = await createNewInvoice(orderId); //latestPaidInvoiceId setted here
      // const paymentCreated = await createNewPayment(orderId);
      const updatedUserDict = await updateUserDict(selectedCatalogObjSquareId);
      console.log('Full Order Completed')
      router.push('/BusinessUpgradeConfirmation')        

    }

    async function createNewOrder() {
      const squareUserId = userDict.squareUserId;
      const priceMoney = fullPackageObjData.mongoDbObjects.filter((eachobj) => eachobj.squareCatalogObjectId === selectedCatalogObjSquareId)[0].price
      const catalogObjectName = fullPackageObjData.squareObjects.filter((eachobj) => eachobj.id === selectedCatalogObjSquareId)[0].subscriptionPlanData.name
      const response  = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-new-order` , {
        squareUserId : squareUserId ,
        priceMoney: priceMoney,
        catalogObjectName: catalogObjectName 
      })
      .then((response) =>{
        const orderId = response.data.orderId
        console.log('order id ' , orderId)
        setOrderId(orderId)
        return orderId
      })
      .catch((err)=>{
          console.log(err)
      })
      return response
    }

    // Create Payment after order
    async function createNewPayment(orderId){
      const squareUserId = userDict.squareUserId;
      const paymentAmount = fullPackageObjData.mongoDbObjects.filter((eachobj) => eachobj.squareCatalogObjectId === selectedCatalogObjSquareId)[0].price
      await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-user-payment` , {
        squareUserId : squareUserId ,
        orderId: orderId,
        paymentAmount: paymentAmount 
      })
      .then((response) =>{
        console.log('payment created : ' , response.data)
        createNewInvoice(orderId)
      })
      .catch((err)=>{
          console.log(err)
      })
    }

    // CreateInvoice After Payment
    async function createNewInvoice(orderId){
      const squareUserId = userDict.squareUserId;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-user-invoice` , {
        squareUserId : squareUserId ,
        orderId: orderId,
      })
      .then((response) =>{
          console.log('invoice created : ' , response.data)
          window.localStorage.setItem('latestPayedInvoiceId' , response.data.invoiceId)
          return response.data.invoiceId
      })
      .catch((err)=>{
          console.log(err)
      })
      return response
    }

    async function updateUserDict(){
      const mongoDbId = fullPackageObjData.mongoDbObjects.filter((eachobj) => eachobj.squareCatalogObjectId === selectedCatalogObjSquareId)[0]._id
      console.log(mongoDbId)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/update-user-package` , {
        userEmail : userEmail ,
        currentPackageId: mongoDbId,
      })
      .then((response) =>{
          console.log(response.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    }

  return (
    <div className='py-20 min-h-screen overflow-auto bg-primary'>
        <TopHeader />
        {/* <Packagebox /> */}
        <Box sx={{maxWidth: '400px', margin: 'auto', padding: '20px' }} className='bg-white'>
            
          <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Select a Package</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }} className='py-2'>
              {fullPackageObjData && selectedCatalogObjSquareId && 
                <Select className='w-full' value={selectedCatalogObjSquareId}  onChange={(e)=> handleSelectChange(e)}>
                  {fullPackageObjData.mongoDbObjects.sort((objA, objB) => objA.price <= objB.price).map((eachPackage) => (
                    <MenuItem key={eachPackage.itemName} value={eachPackage.squareCatalogObjectId}>{eachPackage.itemName}</MenuItem>
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
                      {/* <Button className='self-center' variant='contained' color='success' onClick={() => handleSelectCard(eachCard.id)}>Select Card and Pay</Button> */}
                    </div>
                    }
                  </div>
                ))}
              </div>

              
            }

            {/* Don't Show if user no change selection from current plan */}
            {/* activetab is also a signifier if card is selected */}
            {selectedCatalogObjSquareId !== currentPackageId && activeTab && <Button onClick={() => confirmOrder()} variant='contained' color='success' className='py-2 mt-2 bg-black text-white'>Confirm Order and Pay Now</Button>}
        </Box>

        
        <SimpleBottomNavigation/>

    </div>
  )
}

export default Page;