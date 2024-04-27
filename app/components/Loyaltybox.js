// LoyaltyBox.js
import React from 'react';
import { Box } from '@mui/material';

const LoyaltyBox = () => {
  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>

      <h2>Loyalty Rewards</h2>
      <p>Learn more about our loyalty program and rewards!</p>
    </Box>
  );
};

export default LoyaltyBox;