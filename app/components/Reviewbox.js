import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';

const ReviewBox = ({ reviews }) => {  
  const router = useRouter();


  return (
    <Box sx={{ borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Reviews
      </Typography>
      <List style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map((review) => (
          <ListItem key={review._id} sx={{ marginBottom: '10px' }}>
            <Card className='w-full'>
              <CardContent>
                <Typography variant='subtitle1'>{review.title}</Typography>
                <Typography variant='body2'>{review.reviewer}</Typography>
                <Typography variant='caption'>{review.reviewText}</Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Button variant='outlined' color='success' onClick={() => router.push('/Reviews')}>Read All Reviews</Button>
    </Box>
  );
};

export default ReviewBox;
