// ReviewsBox.js
import React from 'react';
import { Box } from '@mui/material';

const ReviewsBox = () => {
  // Mock reviews data
  const reviews = [
    { id: 1, user: 'User 1', comment: 'This place is amazing!' },
    { id: 2, user: 'User 2', comment: 'Great service and food.' },
    // Add more reviews
  ];

  return (
    <Box sx={{ border: 1, borderColor: 'black', borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>

      <h2 style={{ textAlign: 'center' }}>Reviews</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map(review => (
          <li key={review.id} style={{ marginBottom: '10px' }}>
            <strong>{review.user}</strong>: {review.comment}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ReviewsBox;

