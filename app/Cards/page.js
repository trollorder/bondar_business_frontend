'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import TopHeader from "../components/Topheader"
import SimpleBottomNavigation from "../components/Bottomnav"
import StandardCardDetails from "../PaymentComponents/StandardCardDisplay"
import { Typography } from "@mui/material"

function page() {
    const [cards,setCards] = useState(null)
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
            getCards(response.data.squareUserId)
        })
        .catch((error)=>{
          console.log(error)
        })
    },[])


    function getCards(squareUserId){
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/list-cards` , {params:{squareUserId:squareUserId}})
      .then((response) =>{
          setCards(response.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    return (
      <div className="py-20">
            {userDict && <TopHeader businessName={userDict.companyName}/>}
            <Typography variant="body2" style={{fontWeight:'bold'}} className="mx-2">Cards</Typography>
            {cards && cards.map((eachCard) =>(
                <StandardCardDetails card={eachCard} key={eachCard.id}/>
            ))}
            <SimpleBottomNavigation/>
      </div>
    )
}
export default page