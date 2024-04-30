import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import profileImag from "../../assets/logo.jpg"
import ImageUploader from './ImageUploader';

const MediaBox = ({userEmail, editMode, toggleEditMode,generalMediaUrls, onDeleteImage }) => {
  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto'}} >
      <Typography variant='h5' style={{fontWeight:'bold'}}>Media And Photos</Typography>
      {generalMediaUrls.length > 0 && (
        <div className="flex bg-white py-2 shadow-md rounded-xl flex-1 space-x-2 overflow-x-scroll justify-center w-full z-0">
          {generalMediaUrls.map((eachUrl) => (
            <div className='space-y-2' >
              <Image
                key={eachUrl}
                src={eachUrl}
                width={100}
                height={100}
                className='rounded-md'
                style={{ width: '100px', height: '150px' }}
                alt='generalImage'
                onError={(error) => {
                  console.error('Error loading image:', error);
                }}
              />
              {editMode && <Button variant='outlined' size='small' style={{color:'white', backgroundColor:'darkred'}} onClick={() => onDeleteImage(eachUrl)}>Delete</Button>}
            </div>
          ))}
        </div>
      )}

      {editMode && <ImageUploader userEmail={userEmail} uploadType={"generalMedia"}/>}
      {editMode && (
        <Button className="edit-button" onClick={toggleEditMode}>
          Save Images
        </Button>
      )}
    </Box>
  );
};

export default MediaBox;
