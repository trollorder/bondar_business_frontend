'use client'
import React from 'react'
import Packagebox from '../components/Packagebox'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Button } from '@mui/base'
import Billing from '../components/Billing';



const page = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div>
        <Packagebox />
        <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            
            <div>Upgrade your package!</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Tiers</h3>
                <Button onClick={toggleDropdown}>Toggle Dropdown</Button>
                {isOpen && (
                    <div style={{ border: '1px solid black', marginTop: '5px' }}>
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                    </div>
                )}
            </div>
            <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
                <div>
                    Package Selected
                </div>
            </Box>
            
            <Billing/>
        </Box>
        
        
        

    </div>
  )
}

export default page