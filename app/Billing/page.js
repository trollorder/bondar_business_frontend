'use client'
import Button from '@mui/material/Button';
import PackageComparison from '../components/PackageComparison';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import { useRouter } from 'next/navigation';

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
    const [packageDataID, setPackageDataID] = useState('');

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
          setUserDict(response.data)
          setPackageDataID(response.data.currentPackageId);
          getPackageCatalog()
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])

    function getPackageCatalog(){
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
      .then((response) => {
        setFullPackageObjData(response.data)
        console.log(response.data.mongoDbObjects)
        const mongoDbObjects = response.data.mongoDbObjects;
        const packageObject = mongoDbObjects.find(obj => obj._id === packageDataID);
        if (packageObject) {
          // this part is to get only the name
          setPackagePrice(packageObject.price);
          console.log('current price ' , packagePrice.price)
        } 
      })
      .catch((error) => {
        console.log(error);
      });
    }
  return (
    <div className='py-20'>
        {userDict && <TopHeader businessName={userDict.companyName}/>}
        <div>Current Retainer Package</div>
        {packagePrice && <div style={{ display: 'flex', alignItems: 'center' }}>  
            <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
              <div>${packagePrice}/month</div>
            <Button onClick={() => router.push('/BusinessUpgrade')}>
                Upgrade
            </Button>
        </div>}
        {/* <Pricingtable /> */}
        {fullPackageObjData && <PackageComparison packageDataMongoDb={fullPackageObjData.mongoDbObjects} />}
        <SimpleBottomNavigation/>
    </div>
  )
}

export default page