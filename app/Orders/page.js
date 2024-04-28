'use client'
import { Typography } from "@mui/material"
import StandardOrder from "../PaymentComponents/StandardOrder"
import { useState, useEffect } from "react"
import axios from "axios"
import TopHeader from "../components/Topheader"
import SimpleBottomNavigation from "../components/Bottomnav"

function  page() {
    const [orders,setOrders] = useState(null)
    const [userDict , setUserDict] = useState(null)
    const [userEmail, setUserEmail] = useState(
        () => {
          if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('userEmail') || 'NoEmail';
          } else {
            return 'NoEmail';
          }
        }
      )
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-business-user-details` , {params:{userEmail : userEmail}})
        .then( (response) =>{
            setUserDict(response.data)
            getOrders(response.data.squareUserId)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])


    function getOrders(squareUserId){
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-orders` , {params:{squareUserId:squareUserId}})
        .then((response) =>{
            setOrders(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
      <div className="py-20">
            {userDict && <TopHeader businessName={userDict.companyName}/>}
            {orders && orders.map((eachOrder) =>(
                <StandardOrder order={eachOrder} key={eachOrder.id}/>
            ))}
            <SimpleBottomNavigation/>
      </div>
    )
  }
  
  export default page