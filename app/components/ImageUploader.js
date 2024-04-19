'use client'
import React, { useState } from 'react';
import CloudinaryUploadWidget from './cloudinaryUploadWidget';
import axios from 'axios';
function ImageUploader({userName}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [public_id , setPublicId] = useState('')
    const [uwConfig] = useState({
        cloudName: 'doa0uiisg',
        uploadPreset:'fksiqlxn',
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        folder: userName, //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        clientAllowedFormats: ["png", "jpg", "jpeg"], //restrict uploading to image files only
        maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        maxImageWidth: 768, //Scales the image down to a width of 2000 pixels before uploading
      });

    // on upload i need a database entry 
    function onUpload(userName, imageId) {
      axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/new-image-upload`).then((console.log(userName,imageId)))
    }
  return (
    <div className='p-2 flex justify-center'>

        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} onUpload={onUpload} userName={userName}/>
    </div>
    
  );
}

export default ImageUploader;