'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import TopHeader from "../components/Topheader"
import SimpleBottomNavigation from "../components/Bottomnav"
import { Typography } from "@mui/material"
import StandardInvoice from "../PaymentComponents/StandardInvoice"

function page() {
    const [invoices,setInvoices] = useState(null)
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
            getInvoices(response.data.squareUserId)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])


    function getInvoices(squareUserId){
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-user-invoices` , {params:{squareUserId:"JR373PY7B7QHWTW02HZP2VSH80"}})
      .then((response) =>{
          setInvoices(response.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    return (
      <div className="py-20">
            {userDict && <TopHeader businessName={userDict.companyName}/>}
            <Typography variant="body2" style={{fontWeight:'bold'}} className="mx-2">Invoices</Typography>
            {invoices && invoices.map((eachInvoice) =>(
                <StandardInvoice invoice={eachInvoice} key={eachInvoice.id} />
            ))}
            <SimpleBottomNavigation/>
      </div>
    )
}
export default page