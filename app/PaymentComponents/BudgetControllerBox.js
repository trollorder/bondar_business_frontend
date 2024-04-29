'use client'
import { Box, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cancel } from '@mui/icons-material';
const BudgetControllerBox = ({ budget, onBudgetChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(budget || 0); // Set initial budget or default to 0

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleBudgetChange = (event) => {
    const newBudget = parseInt(event.target.value, 10);
    if (!isNaN(newBudget)) {
      setCurrentBudget(newBudget);
    }
  };

  const handleBudgetSave = () => {
    onBudgetChange(currentBudget); // Call the provided callback with the updated budget
    setIsEditing(false);
  };

  return (
    <Box className='flex justify-evenly items-center shadow-md m-2 py-4 px-2 '>
        <DiamondIcon style={{fontSize:'40px'}}/>
      {isEditing ? (
        <TextField
          variant="standard"
          type="number"
          value={currentBudget}
          onChange={handleBudgetChange}
          onBlur={handleBudgetSave} // Save budget on blur
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleBudgetSave}>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <div className='border shadow-sm w-1/3 rounded-md text-center mx-6 py-4'>
            <Typography variant="body1" style={{fontWeight:'bold'}}>${currentBudget} USD/Month</Typography>
        </div>
      )}
      <IconButton onClick={handleEditClick} className='border border-black rounded-s-full mr-10 '>
        {isEditing? <Cancel/> :<TuneIcon />}
      </IconButton>
    </Box>
  );
};

export default BudgetControllerBox;
