'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import ImageUploader from './ImageUploader';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProfileBox = ({userEmail, editMode, toggleEditMode, businessDetails, setBusinessDetails, handleSaveProfile }) => {
  const [profileImgUrl, setProfileImgUrl] = useState(null)
  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/get-current-business-user-profile-img` , {params:{userEmail:userEmail}})
    .then((response)=>{
      const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_DISPLAY_URL}/${response.data.imageUrl}`
      setProfileImgUrl(url)
    })
    .catch((err)=>console.log(err))
  },[])

  return (
    <Box sx={{ textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-col items-center w-1/3 self-center'>
          {/* Profile Picture */}
          <div className='flex w-full justify-end'>
            {editMode ? (
              <IconButton onClick={() => handleSaveProfile()}>
                <CheckCircleIcon/>
              </IconButton>
            ) : (
              <IconButton onClick={() => toggleEditMode()}>
                  <EditIcon/>
              </IconButton>
            )}
          </div>
          
          {profileImgUrl && <Image src={profileImgUrl} alt="Profile Picture" width={100} height={100} style={{ borderRadius: '50%', width: '100px', height: '100px' }}  />}
        </div>
        
      </div>
      {businessDetails && <div>
        {editMode ? (
          <div>
            <ImageUploader userEmail={userEmail} uploadType={"businessProfilePhoto"}/>
            <Typography variant='h6'>{businessDetails.companyName}</Typography>
            <div className='flex w-full justify-center space-x-2'>
              <Select className='w-1/3' value={businessDetails.companyMajorType} onChange={(e) => setBusinessDetails({...businessDetails,companyMajorType:e.target.value})}>
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
              </Select><br />
              <Select className='w-1/3' value={businessDetails.companyMinorType} onChange={(e) => setBusinessDetails({...businessDetails,companyMinorType:e.target.value})}>
                <MenuItem value="Subtype 1">Subtype 1</MenuItem>
                <MenuItem value="Subtype 2">Subtype 2</MenuItem>
                <MenuItem value="Subtype 3">Subtype 3</MenuItem>
              </Select><br />
              <Select  className='w-1/3' value={businessDetails.companyPriceLevel} onChange={(e) => setBusinessDetails({...businessDetails,companyPriceLevel:e.target.value})}>
                <MenuItem value="$">$</MenuItem>
                <MenuItem value="$$">$$</MenuItem>
                <MenuItem value="$$$">$$$</MenuItem>
              </Select>
            </div>
          </div>  
        ) : (
          <div className='flex flex-col'>
            <Typography variant='h4' style={{fontWeight:'bolder'}}>{businessDetails.companyName}</Typography>
            <Typography variant='subtitle'>{businessDetails.companyAddress}</Typography>
            <div className='flex w-full justify-evenly px-2 mt-2 space-x-2'>
              <Typography variant="body1" className='bg-white rounded-xl w-1/3 py-2'>
                {businessDetails.companyMajorType}
              </Typography>
              <Typography variant="body1" className='bg-white rounded-xl w-1/3 py-2'>
                {businessDetails.companyMinorType}
              </Typography>
              <Typography variant="body1" className='bg-white rounded-xl w-1/3  py-2'>
                {businessDetails .companyPriceLevel}
              </Typography>
            </div>
          </div>
        )}
      </div>}
    </Box>
  );
};

export default ProfileBox;
