import React from 'react'
import invoice from "../../assets/logo.jpg"
import Image from 'next/image'
import { Box, Button } from '@mui/material'
import StandardInvoice from '../PaymentComponents/StandardInvoice'


const Confirmation = ({status}) => {
  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <h2>{status}</h2>
        <StandardInvoice />
        <Button variant='contained' color='success'>
            Confirm
        </Button>
    </Box>
  )
}

export default Confirmation