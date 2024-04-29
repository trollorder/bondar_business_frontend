'use client'
import axios from 'axios';
import StandardOrder from '../PaymentComponents/StandardOrder';
import { useEffect, useState } from 'react';
import StandardInvoice from '../PaymentComponents/StandardInvoice';
import StandardCardDetails from '../PaymentComponents/StandardCardDisplay';
import { Button, Typography , Box, Tabs, Tab } from '@mui/material';

import TopHeader from '../components/Topheader';
import SimpleBottomNavigation from '../components/Bottomnav';
import CreditCardForm from '../PaymentComponents/CreditCardForm';
import { useRouter } from 'next/navigation';
function Finances(){
    const router  = useRouter();
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
    const [isInputingNewCard, setIsInputingNewCard] = useState(false)
    const [activeTab, setActiveTab] = useState('Invoices');
    const handleChange = (event, newActiveTab) => {
      setActiveTab(newActiveTab);
    };
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
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-orders` , {params:{squareUserId:businessId}})
        .then((response) =>{
            setOrders(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function getInvoices(businessId){
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-invoices` , {params:{squareUserId:businessId}})
        .then((response) =>{
            setInvoices(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
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
    function handleEnterNewCard(){
        setIsInputingNewCard(true)
    }

    function createNewCreditCard(newCardDetails){
        const { expYear, cardHolderName, expMonth } = newCardDetails;
        axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/create-card` ,{
            squareUserId : userDict.squareUserId,
            expMonth: expMonth,
            expYear: expYear,
            cardHolderName:cardHolderName
        })
        .then((response)=>{
            router.push('/Finances')
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    function onClose(){
        setIsInputingNewCard(false)
    }
    return(
        <div className='py-20'>
            
            {userDict && <TopHeader businessName={userDict.companyName}/>}

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Invoices" value="Invoices" />
                    <Tab label="Orders" value="Orders" />
                    <Tab label="Cards" value="Cards" />
                </Tabs>
            </Box>

            {/* Invoices Testing */}
            {activeTab==='Invoices' && <div className='shadow-md p-2 rounded-sm m-2'>

                <Typography variant='h4'>Invoices</Typography>
                {invoices && invoices.map((eachInvoice) =>(
                    <StandardInvoice invoice={eachInvoice} key={eachInvoice.id} />
                ))}
            </div>}
                {/* Orders Testing */}
            {activeTab==='Orders' && <div className='shadow-md p-2 rounded-sm m-2'>
                <Typography variant='h4'>Orders</Typography>

                {orders && orders.map((eachOrder) =>(
                    <StandardOrder order={eachOrder} key={eachOrder.id}/>
                ))}
            </div>}
                {/* Cards Testing */}
            {activeTab === "Cards" && <div className='shadow-md p-2 rounded-sm m-2'>

                <Typography variant='h4'>Cards</Typography>
                <div className='flex flex-col space-y-2 p-2'>
                    {cards && cards.map((eachCard) =>(
                        <StandardCardDetails card={eachCard} key={eachCard.id} />
                    ))}
                </div>
                <Button variant='contained' color='success' onClick={() => handleEnterNewCard()}>Enter New Card</Button>
                <CreditCardForm open={isInputingNewCard} onClose={onClose} onSubmit={createNewCreditCard}/>
            </div>}

                

           <SimpleBottomNavigation/>
        </div>
    )
}
export default Finances;