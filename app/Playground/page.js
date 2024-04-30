'use client'
import axios from 'axios';
import StandardOrder from '../PaymentComponents/StandardOrder';
import { useEffect, useState } from 'react';
import StandardInvoice from '../PaymentComponents/StandardInvoice';
import StandardCardDetails from '../PaymentComponents/StandardCardDisplay';
import { Typography } from '@mui/material';
function playground(){
    const [orders,setOrders] = useState(null)
    const [invoices,setInvoices] = useState(null)
    const [cards, setCards] = useState(null)
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
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
            const businessId = response.data.squareUserId
            setUserDict(response.data)
            getOrders(businessId)
            getCards(businessId)
            getInvoices(businessId)
        })
        .catch((error)=>{
        console.log(error)
        })
    },[])
    function getOrders(businessId){
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-orders` , {params:{squareUserId:"businessId"}})
        .then((response) =>{
            setOrders(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function getInvoices(businessId){
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-invoices` , {params:{squareUserId:"JR373PY7B7QHWTW02HZP2VSH80"}})
        .then((response) =>{
            setInvoices(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
        
    function getCards(businessId) {
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/list-cards` , {params:{squareUserId:"JR373PY7B7QHWTW02HZP2VSH80"}})
        .then((response) =>{
            setCards(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>
            {/* Orders Testing */}
            <Typography variant='h4'>Orders</Typography>
            {orders && orders.map((eachOrder) =>(
                <StandardOrder order={eachOrder} key={eachOrder.id}/>
            ))}

            {/* Invoices Testing */}
            <Typography variant='h4'>Invoices</Typography>
            {invoices && invoices.map((eachInvoice) =>(
                <StandardInvoice invoice={eachInvoice} key={eachInvoice.id} />
            ))}

            {/* Cards Testing */}
            <Typography variant='h4'>Cards</Typography>
            <div className='flex flex-col space-y-2 p-2'>
                {cards && cards.map((eachCard) =>(
                    <StandardCardDetails card={eachCard} key={eachCard.id} />
                ))}
            </div>
           
        </div>
    )
}
export default playground;