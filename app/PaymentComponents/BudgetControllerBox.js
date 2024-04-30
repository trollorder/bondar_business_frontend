'use client'
import { Box, Typography, IconButton, TextField, InputAdornment, Checkbox, InputLabel } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cancel, Label } from '@mui/icons-material';
const BudgetControllerBox = ({ budget, onBudgetChange, loyaltyProgrammeDict }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(budget || 0); // Set initial budget or default to 0
  const [localDictCopy, setLocalDictCopy] = useState(loyaltyProgrammeDict);
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
    console.log(localDictCopy)
    onBudgetChange(Number(currentBudget), localDictCopy.hasCoupons, localDictCopy.hasDiscounts,localDictCopy.hasSubscriptions); // Call the provided callback with the updated budget
    setIsEditing(false);
  };

  return (
    <Box className='flex flex-col justify-evenly items-center shadow-md m-2 py-4 px-2 bg-white rounded-2xl '>
      <div className='w-full flex justify-evenly items-center'>
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
          <div className='border shadow-sm w-1/2 rounded-md text-center mx-6 py-4'>
              <Typography variant="body1" style={{fontWeight:'bold'}}>${currentBudget} USD/Month</Typography>
          </div>
        )}
        <IconButton onClick={handleEditClick} className='border border-black rounded-s-full mr-10 '>
          {isEditing? <Cancel/> :<TuneIcon />}
        </IconButton>
      </div>
      {isEditing && (
        <div className="w-full flex space-evenly">
          <div className="flex flex-col justify-center w-1/3 items-center">
            <InputLabel>Discounts</InputLabel>
            <Checkbox
              inputProps={{ 'aria-label': 'controlled' }}
              checked={localDictCopy.hasDiscounts}
              onChange={(e) => {
                setLocalDictCopy({...localDictCopy, hasDiscounts: e.target.checked});
              }}
            />
          </div>
          <div className="flex flex-col justify-center w-1/3 items-center">
            <InputLabel>Coupons</InputLabel>
            <Checkbox
              checked={localDictCopy.hasCoupons}
              onChange={(e) => {
                setLocalDictCopy({...localDictCopy, hasCoupons: e.target.checked});
              }}
            />
          </div>
          <div className="flex flex-col justify-center w-1/3 items-center">
            <InputLabel>Subscriptions</InputLabel>
            <Checkbox
              checked={localDictCopy.hasSubscriptions}
              onChange={(e) => {
                setLocalDictCopy({...localDictCopy, hasSubscriptions: e.target.checked});
              }}
            />
          </div>
        </div>
      )}

      

    </Box>
  );
};

export default BudgetControllerBox;
