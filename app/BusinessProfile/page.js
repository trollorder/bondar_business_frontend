'use client'
import React, { useState } from 'react';
import SimpleBottomNavigation from '../components/Bottomnav';
import TopHeader from '../components/Topheader';
import ProfileBox from '../components/Profilebox.js';
import MediaBox from '../components/Mediabox';
import ReviewBox from '../components/Reviewbox';
import LoyaltyBox from '../components/Loyaltybox';

const BusinessProfilePage = () => {
  // State for managing edit mode
  const [editMode, setEditMode] = useState(false);

  // Handler for toggling edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <TopHeader businessName={"Cafe Lincoln"} />

      <ProfileBox editMode={editMode} toggleEditMode={toggleEditMode} businessAddress={"1626 Kains"} businessName={"Cafe Lelia"} />

      <MediaBox editMode={editMode} toggleEditMode={toggleEditMode} />

      <ReviewBox />

      <LoyaltyBox />
      
      <SimpleBottomNavigation />
    </div>
  );
};

export default BusinessProfilePage;
