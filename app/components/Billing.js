import React from 'react'
import { Box } from '@mui/material'
import StandardCardDetails from '../PaymentComponents/StandardCardDisplay'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const Billing = ({cardDetails, catalogObject,userDict}) => {
  const router = useRouter();
  async function confirmOrderThenPay(){
    // i need order square id and then i need the payment id then i do it sequentially
  }

  async function createOrder(orderId){
    axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-new-order` , {
      squareUserId : userDict.squareUserId , 
      priceMoney: catalogObject.price, 
      catalogObjectName:catalogObject.subscriptionPlanData.name})
    .then((response) =>{
      // You Pay After Success
      if (response.status === 200){
        // pay here
      }
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  async function payOrder(orderId) {
    
  }

  return (
    <div>
        <div>
            Payment
        </div>

        <Box sx={{ borderRadius: '10px', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        </Box>
    </div>
  )
}

export default Billing