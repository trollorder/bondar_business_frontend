'use client'
import Button from '@mui/material/Button';
import PackageComparison from '../components/PackageComparison';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { useRouter } from 'next/navigation';
import { CardContent, Card, Typography } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const page = () => {
  const router  = useRouter();
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
    const [currentPackageId, setCurrentPackageId] = useState(null)
    const [fullPackageObjData , setFullPackageObjData] = useState(null)
    const [packagePrice, setPackagePrice] = useState(null)
    const [packageDataID, setPackageDataID] = useState(null);

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
          setUserDict(response.data)
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
    <div className='py-20'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <div className='mx-2'>
          <Typography variant='h6' style={{fontWeight:'bold'}}>Current Retainer Package</Typography>
          <Card>
            <CardContent className='flex'>
              <DiamondIcon style={{color:getColorFromPrice(packagePrice), fontSize:80}} />
              <div className='flex flex-col'>
                <Typography variant='caption'>Current Package</Typography>
                <Typography variant='body1'>{packagePrice} USD/Month</Typography>
                <Button variant='contained' onClick={() => router.push('/BusinessUpgrade')}>
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Below is the Transposed Table */}
          {fullPackageObjData && <PackageComparison packageDataMongoDb={fullPackageObjData.mongoDbObjects} />}
        </div>
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page