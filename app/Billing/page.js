import React from 'react'
import Packagebox from '../components/Packagebox'
import Button from '@mui/material/Button';
import Pricingtable from '../components/Pricingtable'



const page = () => {
  return (
    <div>
        <Packagebox />
        <Button variant="contained" style={{display: 'flex', justifyContent: 'center'}}>View Invoices</Button>
        <Pricingtable />
        
    </div>
  )
}

export default page