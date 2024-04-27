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
          router.push('/BusinessProfile'); // Navigate to business profile page
          break;
        case 2:
          router.push('/Home'); // Navigate to home page
          break;
        case 3:
          router.push('/Analytics'); // Navigate to analytics page
          break;
        default:
          break;
          
      }
    };
  
    return (
      <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          sx={{ 
            backgroundColor: '#b82a66', // Dark pink background color
            '& .MuiBottomNavigationAction-root': {
              color: 'pink', // Pink outline color
            },
            '& .MuiSvgIcon-root': {
              borderRadius: '8px', // Rounded square background
              backgroundColor: 'white', // White background color
            },
          }}
        >
          <BottomNavigationAction label="Billing" icon={<ListIcon />} />
          <BottomNavigationAction label="Business Profile" icon={<WorkOutlineIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Analytics" icon={<AutoGraphIcon />} />
        </BottomNavigation>
      </Box>
    );
  }