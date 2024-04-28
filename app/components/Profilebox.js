'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import ImageUploader from './ImageUploader';
import axios from 'axios';

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
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <div >
        <div className='flex flex-col items-center'>
          {/* Profile Picture */}
        {profileImgUrl && <Image src={profileImgUrl} alt="Profile Picture" width={100} height={100} style={{ borderRadius: '50%', width: '100px', height: '100px' }}  />}
        </div>
        <div>
          <Typography variant="h5">{}</Typography>
          <Typography variant="body1">{}</Typography>
        </div>
        {editMode ? (
          <Button onClick={() => handleSaveProfile()} variant="outlined">
            Save Profile
          </Button>
        ) : (
          <Button onClick={toggleEditMode} variant="outlined">
            Edit Profile
          </Button>
        )}
      </div>
      {businessDetails && <div>
        {editMode ? (
          <div>
            <ImageUploader userEmail={userEmail} uploadType={"businessProfilePhoto"}/>
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
          <div className='flex'>
            <Typography variant="body1">
              Company Type: {businessDetails.companyMajorType}
            </Typography>
            <Typography variant="body1">
              Company Subtype: {businessDetails.companyMinorType}
            </Typography>
            <Typography variant="body1">
              Price Range: {businessDetails .companyPriceLevel}
            </Typography>
          </div>
        )}
      </div>}
    </Box>
  );
};

export default ProfileBox;
