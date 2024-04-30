'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ListIcon from '@mui/icons-material/List';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeIcon from '@mui/icons-material/Home';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useRouter } from 'next/navigation';
import CreditCardIcon from '@mui/icons-material/CreditCard';;

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const router = useRouter();

    const handleChange = (event, newValue) => {
      setValue(newValue);
      switch (newValue) {
        case 0:
          router.push('/Billing'); // Navigate to billing page
          break;
        case 1:
          router.push('/Finances'); // Navigate to business profile page
          break;
        case 2:
          router.push('/Home'); // Navigate to home page
          break;
        case 3:
          router.push('/Analytics'); // Navigate to analytics page
          break;
        case 4:
          router.push('/BusinessProfile');
          break
        default:
          break;
          
      }
    };
  
    return (
      <Box sx={{ width: '100%' , position: 'fixed', bottom: 0 }} >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          className='bg-secondary text-black'
          
          sx={{ 
            '& .MuiSvgIcon-root': {
              borderRadius: '8px', // Rounded square background
              backgroundColor: 'white', // White background color
            }, height: '6vh'
          }}
        >
          <BottomNavigationAction
            label="Billing"
            className='font-body text-xs' // Apply text-xs class for 0.5rem font size
            icon={<ListIcon />}
          />
          <BottomNavigationAction
            label="Finances"
            className='text-xs' // Apply text-xs class for 0.5rem font size
            icon={<CreditCardIcon />}
          />
          <BottomNavigationAction
            label="Home"
            className='text-xs' // Apply text-xs class for 0.5rem font size
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Analytics"
            className='text-xs' // Apply text-xs class for 0.5rem font size
            icon={<AutoGraphIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            className='text-xs' // Apply text-xs class for 0.5rem font size
            icon={<WorkOutlineIcon className='bg-white'/>}
          />
        </BottomNavigation>
      </Box>
    );
  }