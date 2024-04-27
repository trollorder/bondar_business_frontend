'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import CloudinaryUploadWidget from './cloudinaryUploadWidget';
import ImageUploader from './ImageUploader';
import axios from 'axios';

const ProfileBox = ({ editMode, toggleEditMode, businessName, businessAddress, retailType, retailSubtype, priceRange }) => {
  const [newRetailType, setNewRetailType] = useState(retailType);
  const [newRetailSubtype, setNewRetailSubtype] = useState(retailSubtype);
  const [newPriceRange, setNewPriceRange] = useState(priceRange);
  const [userEmail, setUserEmail] = useState(
    () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('userEmail') || 'NoEmail';
      } else {
        return 'NoEmail';
      }
    }
  )
  const [profileImgUrl, setProfileImgUrl] = useState(null)
  const handleRetailTypeChange = (event) => {
    setNewRetailType(event.target.value);
  };

  const handleRetailSubtypeChange = (event) => {
    setNewRetailSubtype(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setNewPriceRange(event.target.value);
  };

  const handleSaveProfile = () => {
    // Save the profile details here, for now just toggle edit mode
    toggleEditMode();
    // Update the state variables with the new values
    setNewRetailType(retailType);
    setNewRetailSubtype(retailSubtype);
    setNewPriceRange(priceRange);
  };

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-current-business-user-profile-img` , {params:{userEmail:userEmail}})
    .then((response)=>{
      const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_DISPLAY_URL}/${response.data.imageUrl}`
      setProfileImgUrl(url)
      console.log(url)
    })
    .catch((err)=>console.log(err))
  },[])

  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <div >
        <div className='flex flex-col items-center'>
          {/* Profile Picture */}
        {profileImgUrl && <Image src={profileImgUrl} alt="Profile Picture" width={100} height={100} style={{ borderRadius: '50%', width: '100px', height: '100px' }}  />}
        </div>
        <div>
          <Typography variant="h4">{businessName}</Typography>
          <Typography variant="body1">{businessAddress}</Typography>
        </div>
        {editMode ? (
          <Button onClick={handleSaveProfile} variant="outlined">
            Save Profile
          </Button>
        ) : (
          <Button onClick={toggleEditMode} variant="outlined">
            Edit Profile
          </Button>
        )}
      </div>
      <div>
        {editMode ? (
          <div>
            <ImageUploader userEmail={userEmail}/>
            <div className='flex w-full justify-center space-x-2'>
              <Select className='w-1/3' value={newRetailType} onChange={handleRetailTypeChange}>
                <MenuItem value="Type 1">Type 1</MenuItem>
                <MenuItem value="Type 2">Type 2</MenuItem>
                <MenuItem value="Type 3">Type 3</MenuItem>
              </Select><br />
              <Select className='w-1/3' value={newRetailSubtype} onChange={handleRetailSubtypeChange}>
                <MenuItem value="Subtype 1">Subtype 1</MenuItem>
                <MenuItem value="Subtype 2">Subtype 2</MenuItem>
                <MenuItem value="Subtype 3">Subtype 3</MenuItem>
              </Select><br />
              <Select  className='w-1/3' value={newPriceRange} onChange={handlePriceRangeChange}>
                <MenuItem value="Low">$</MenuItem>
                <MenuItem value="Medium">$$</MenuItem>
                <MenuItem value="High">$$$</MenuItem>
              </Select>
            </div>
          </div>
        ) : (
          <>
            <Typography variant="body1">
              Retail Type: {newRetailType}
            </Typography>
            <Typography variant="body1">
              Retail Subtype: {newRetailSubtype}
            </Typography>
            <Typography variant="body1">
              Price Range: {newPriceRange}
            </Typography>
          </>
        )}
      </div>
    </Box>
  );
};

export default ProfileBox;
