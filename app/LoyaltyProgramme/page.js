'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, Button , ButtonGroup, Card, CardContent } from '@mui/material';
import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import BudgetControllerBox from '../PaymentComponents/BudgetControllerBox';
import LoyaltyProgramLineItemCard from '../components/LoyaltyLineItemDisplays';
function Page(){
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
    const [loyaltyProgrammeDict, setLoyaltyProgrammeDict] = useState(null)
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
          setUserDict(response.data)
          getLoyaltyProgrammeForUser(response.data._id)
        })
        .catch((error)=>{
          console.log(error)
        })

        
    },[])

    function getLoyaltyProgrammeForUser(businessId){
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-loyalty-programme-for-user` , {params:{businessUserId : businessId}})
      .then( (response) =>{
        // If loyalty Programme Exist then set if no have don't set
        if (!response.data_id ){
          setLoyaltyProgrammeDict(response.data)
          setBudget(response.data.currentMonthlyBudget)
        }

      })
      .catch((error)=>{
        console.log(error)
      })
    }

    // Axios Route to Set New Budget
    function onBudgetChange(newBudgetAmt, hasCoupons, hasDiscounts, hasSubscriptions){
      // check new Budget Amt
      if (isNaN(Number(newBudgetAmt))){
        return 
      }
      const patchLocalDict ={
        businessUserId : userDict._id,
        loyaltyObjectId: loyaltyProgrammeDict._id,
        hasCoupons: hasCoupons,
        hasDiscounts: hasDiscounts,
        hasSubscriptions: hasSubscriptions,
        currentMonthlyBudget: Number(newBudgetAmt)
      }
        
        
    
      axios.put(`${process.env.NEXT_PUBLIC_BACKENDURL}/edit-loyalty-programme-for-user` , patchLocalDict)
      .then( (response) =>{
        // Refresh State with new Object
        window.location.reload(false)
      })
      .catch((error)=>{
        console.log(error)
      })

    }
    function createNewLoyaltyProgrammeForUser(){
      const businessUserId = userDict._id
      const currentMonthlyBudget = 0 ; // Instantiate to be 0 first
      axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-loyalty-programme-for-user` , {
        businessUserId : businessUserId,
        currentMonthlyBudget: currentMonthlyBudget
      })
      .then( (response) =>{
        // Refresh State with new Object
        getLoyaltyProgrammeForUser(businessUserId)
      })
      .catch((error)=>{
        console.log(error)
      })
    }

    return(
        <div className='py-20 bg-primary h-screen'>
            {userDict && <TopHeader businessName={userDict.companyName}/>}
            {/* Create New Loyalty Programme If No Exist */}
            <div className='mx-2'>
              {!loyaltyProgrammeDict &&
              <div className='px-10 py-20'>
                <Card>
                  <CardContent>
                    <Typography variant='h6' style={{fontWeight:"bolder"}}>No Loyalty Programme</Typography>
                    <Typography variant='caption' className='font-title'>Loyalty Programmes Can Help Increase Customer Retention! Create One Today! Set Up A Monthly Budget And We Will Optimise It Automatically</Typography>
                  </CardContent>
                </Card>
                <Button className='mt-2' size='large' variant='contained' color='success' onClick={()=> createNewLoyaltyProgrammeForUser()}>Create New Loyalty Programme</Button>
              </div>
              
              }

              {/* Only Render if Loyalty Programme Can Be Found for User, Else Create */}
              {loyaltyProgrammeDict && 
              <div>  
                {/* Main Component Display */}
                <Typography variant='h6' style={{fontWeight:'bold'}}>Current Budget</Typography>
                <div className=''>
                  {/* Edit Budget Here */}
                  <BudgetControllerBox budget={budget} onBudgetChange={onBudgetChange} loyaltyProgrammeDict={loyaltyProgrammeDict} />
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
                    {loyaltyProgrammeDict.hasDiscounts ? 
                      <div className='px-2'>
                        <Typography variant='h6' className='font-black p-4'>{currentTab}</Typography>
                          {
                            loyaltyProgrammeDict.discountObjects.map((eachObj) => (
                              <LoyaltyProgramLineItemCard data={eachObj} />
                            ))
                          }
                      </div>
                      :
                      <Typography variant='h6' className='font-black p-4'>
                        You have not opted for automated discounts, check it in the budget panel
                      </Typography>
                    }

                  </div>
                  }
                  {currentTab === 'Coupons' && 
                  <div className='bg-white shadow-lg mx-4 my-4 rounded-2xl font-semibold' style={{height:'60vh'}}>
                    {loyaltyProgrammeDict.hasCoupons ? 
                      <div className='px-2'>
                        <Typography variant='h6' className='font-black p-4'>{currentTab}</Typography>
                        {
                          loyaltyProgrammeDict.couponObjects.map((eachObj) => (
                            <LoyaltyProgramLineItemCard data={eachObj} />
                          ))
                        }
                      </div>
                      :
                      <Typography variant='h6' className='font-black p-4'>
                        You have not opted for automated Coupons, check it in the budget panel
                      </Typography>
                    }

                  </div>
                  }
                  {currentTab === 'Subscriptions' && 
                  <div className='bg-white shadow-lg mx-4 my-4 rounded-2xl font-semibold' style={{height:'60vh'}}>
                    {loyaltyProgrammeDict.hasSubscriptions ? 
                      <div className='px-2'>
                        <Typography variant='h6' className='font-black p-4'>{currentTab}</Typography>
                        {
                          loyaltyProgrammeDict.subscriptionObjects.map((eachObj) => (
                            <LoyaltyProgramLineItemCard data={eachObj} />
                          ))
                        }
                      </div>

                      :
                      <Typography variant='h6' className='font-black p-4'>
                        You have not opted for automated Subscriptions, check it in the budget panel
                      </Typography>
                    }
                  </div>
                  }
                  
                </div>
              </div>}
            </div>
           
            <SimpleBottomNavigation/>
        </div>
    )
}
export default Page;