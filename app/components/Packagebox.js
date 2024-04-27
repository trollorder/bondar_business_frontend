import React from 'react'
import Image from 'next/image';
import profileImag from "../../assets/logo.jpg"
import { Box, Button } from '@mui/material';


const Packagebox = () => {
  return (
    <Box sx={{border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <div>Current Retainer Package</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>  
            <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
            <div>
                $20/month
            </div>
            <Button>
                Upgrade
            </Button>
        </div>
    </Box>
  )
}

export default Packagebox