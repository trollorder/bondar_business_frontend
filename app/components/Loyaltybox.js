// LoyaltyBox.js
import React from 'react';
import { Box, Button, Typography} from '@mui/material';

const LoyaltyBox = () => {
  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }} classNam>

      <Typography variant='h5'>Loyalty Rewards</Typography>
      <Typography variant='body2'>Learn more about our loyalty program and rewards!</Typography>
      <Button type='small' variant='contained' >Explore Loyalty Programmes</Button>
    </Box>
  );
};

export default LoyaltyBox;