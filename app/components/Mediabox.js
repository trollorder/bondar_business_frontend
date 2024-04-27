import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import profileImag from "../../assets/logo.jpg"

const MediaBox = ({ editMode, toggleEditMode }) => {
  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>

      <h2>Media</h2>
      <div className="media-container">
        {/* Display media and photos */}
        <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
        <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
        <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
        <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
        <Image src={profileImag} style={{ borderRadius: '50%', width: '100px', height: '100px'}}/>
        {/* Add more media */}
      </div>
      {editMode && (
        <button className="edit-button" onClick={toggleEditMode}>
          Edit Media
        </button>
      )}

      <style jsx>{`
        .media-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 2px solid black;
          border-radius: 10px;
          padding: 10px;
        }

        .media-container {
          overflow-x: auto;
          white-space: nowrap;
          display: flex;
          margin-bottom: 10px;
        }

        .edit-button {
          cursor: pointer;
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
        }
      `}</style>
    </Box>
  );
};

export default MediaBox;
