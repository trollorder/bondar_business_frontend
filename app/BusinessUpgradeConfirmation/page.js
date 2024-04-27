import React from 'react'
import Packagebox from '../components/Packagebox'
import Confirmation from '../components/Confirmation'

const page = () => {
  return (
    <div>
        <Packagebox />
        <Confirmation status={"Transaction Success"}/>
    </div>
  )
}

export default page