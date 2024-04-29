'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, Button , ButtonGroup } from '@mui/material';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import BudgetControllerBox from '../PaymentComponents/BudgetControllerBox';
function playground(){
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
    const [budget, setBudget] = useState(null)
    const [currentTab , setCurrentTab] =useState('Discounts')
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
          setUserDict(response.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])

    // Axios Route to Set New Budget
    function onBudgetChange(newBudgetAmt){

    }


    return(
        <div className='py-20 bg-primary'>
            {userDict && <TopHeader businessName={userDict.companyName}/>}
            <div>  
              {/* Main Component Display */}
              <Typography variant='h6' className='font-black'>Current Budget</Typography>
              <div className='bg-white rounded-2xl'>
                <BudgetControllerBox budget={budget} onBudgetChange={onBudgetChange} />
              </div>
              <Typography variant='h6' className='font-black'>Select Optimisations</Typography>
              <div className='w-full  justify-center flex space-x-2 mt-2'>
                <Button className='bg-brand-yellow text-black shadow-sm rounded-xl px-2' onClick={() => setCurrentTab('Discounts')}>Discounts</Button>
                <Button className='bg-brand-yellow text-black shadow-sm rounded-xl px-2' onClick={() => setCurrentTab('Coupons')}>Coupons</Button>
                <Button className='bg-brand-yellow text-black shadow-sm rounded-xl px-2' onClick={() => setCurrentTab('Subscriptions')}>Subscriptions</Button>
              </div>
              <div className=''>
                {/* Data Div */}
                {currentTab === 'Discounts' && 
                <div className='bg-white shadow-lg mx-4 my-4 rounded-2xl font-semibold' style={{height:'60vh'}}>
                  <Typography variant='h6' className='font-black p-4'>{currentTab}</Typography>
                </div>
                }
                {currentTab === 'Coupons' && 
                <div className='bg-white shadow-lg mx-4 my-4 rounded-2xl font-semibold' style={{height:'60vh'}}>
                  <Typography variant='h6' className='font-black p-4'>{currentTab}</Typography>

                </div>
                }
                {currentTab === 'Subscriptions' && 
                <div className='bg-white shadow-lg mx-4 my-4 rounded-2xl font-semibold' style={{height:'60vh'}}>
                  <Typography variant='h6' className='font-black p-4'>{currentTab}</Typography>

                </div>
                }
                
              </div>
            </div>
            <SimpleBottomNavigation/>
        </div>
    )
}
export default playground;