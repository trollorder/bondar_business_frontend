'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SimpleBottomNavigation from '../components/Bottomnav'
import TopHeader from '../components/Topheader'
import StandardInvoice from '../PaymentComponents/StandardInvoice'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import {Typography, Card, CardContent} from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const page = () => {
  const router = useRouter();
  const [invoices,setInvoices] = useState(null)
  const [userEmail, setUserEmail] = useState(
      () => {
        if (typeof window !== 'undefined' && window.localStorage) {
          return localStorage.getItem('userEmail') || 'NoEmail';
        } else {
          return 'NoEmail';
        }
      }
    )
  const [userDict ,setUserDict] = useState(null)
  const [latestInvoiceId , setLatestInvoiceId] = useState(
    () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('latestPayedInvoiceId') || null;
      } else {
        return null;
      }
    }
  )
  const [fullPackageObjData , setFullPackageObjData] = useState(null)
  const [packagePrice, setPackagePrice] = useState(null)
  const [packageDataID, setPackageDataID] = useState(null);
  const [generatedInvoice , setGeneratedInvoice] = useState(null)
  useEffect(()=>{
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
      .then( (response) =>{
          const businessId = response.data.squareUserId
          setUserDict(response.data)
          getInvoices(businessId)
          setPackageDataID(response.data.currentPackageId);
          getPackageCatalog(response.data.currentPackageId)
      })
      .catch((error)=>{
      console.log(error)
      })
  },[])

  function getPackageCatalog(packageDataID){
    console.log(packageDataID)
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
    .then((response) => {
      setFullPackageObjData(response.data)
      const mongoDbObjects = response.data.mongoDbObjects;
      const packageObject = mongoDbObjects.find(obj => obj._id === packageDataID);
      console.log('pkg obj' , packageObject)
      if (packageObject) {
        setPackagePrice(packageObject.price);
      } 
    })
    .catch((error) => {
      console.log(error);
    });
  }


  function getInvoices(businessId){
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-invoices` , {params:{squareUserId:businessId}})
    .then((response) =>{
        setInvoices(response.data)
        setGeneratedInvoice(response.data.filter((eachInvoice) => eachInvoice.id === latestInvoiceId)[0])
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  function getColorFromPrice(price) {
    const priceRanges = {
      0: 'black',
      20: 'bronze',
      50: 'silver',
      100: 'gold',
      200: 'DarkGreen',
    };
  
    // Handle exact matches and prices above the highest range
    if (price in priceRanges) {
      return priceRanges[price];
    } else if (price > 200) {
      return 'DarkGreen'; // Use the highest color for prices exceeding the range
    }
  
    // Handle prices below the lowest range (default to white)
    return 'black';
  }
  return (
    <div className=' py-14 min-h-screen bg-primary'>
        <TopHeader />
        {/* So here we will generate the invoice for the order */}
        <div className='px-2'>
          <Typography variant='h6' style={{fontWeight:'bold'}}>Current Retainer Package</Typography>
            <Card>
              <CardContent className='flex items-center space-x-2'>
                <DiamondIcon style={{color:getColorFromPrice(packagePrice), fontSize:64}} />
                <div className='flex flex-col border px-2 w-2/3 rounded-xl text-center'>
                  <Typography variant='caption'>Current Package</Typography>
                  <Typography variant='body1'>{packagePrice} USD/Month</Typography>
                </div>
              </CardContent>
            </Card>
          <Typography variant='h5' className='px-4 mt-2' style={{fontWeight:'bolder'}}>Transaction</Typography>
          <div className='bg-white flex flex-col justify-center items-center rounded-2xl'>
            <CheckCircleIcon  style={{fontSize: '120px', color:'#00C85D'}}/>
            {generatedInvoice && <StandardInvoice className='shadow-md' invoice={generatedInvoice} />}
          </div>

        </div>

        <div className='w-full flex items-center justify-center'>
         <Button variant='contained' color='success' className='bg-black text-white px-2 py-4 w-full mx-4 rounded-2xl mt-2' onClick={() => router.push('/Home')}>Confirm</Button>

        </div>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page