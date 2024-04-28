import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import profileImag from "../../assets/logo.jpg"
import ImageUploader from './ImageUploader';

const MediaBox = ({userEmail, editMode, toggleEditMode,generalMediaUrls, onDeleteImage }) => {
  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }} >
      <Typography variant='h4'>Media</Typography>
      {generalMediaUrls.length > 0 && (
        <div className="flex flex-1 space-x-2 overflow-x-scroll justify-center w-full z-0">
          {generalMediaUrls.map((eachUrl) => (
            <div className='space-y-2' >
              <Image
                key={eachUrl}
                src={eachUrl}
                width={100}
                height={100}
                style={{ borderRadius: '50%', width: '100px', height: '100px' }}
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
