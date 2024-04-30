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
    <Box sx={{ borderRadius: '10px', textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
      <List style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map((review) => (
          <ListItem key={review._id} sx={{ marginBottom: '10px' }}>
            <Card className='w-full'>
              <CardContent>
                <Typography className='font-title' variant='subtitle1' style={{fontWeight:'bolder'}}>{review.title}</Typography>
                <Typography className='font-body' variant='body2' style={{fontVariant:'initial'}}>{review.reviewer}</Typography>
                <Typography className='font-body' variant='body1'>{review.reviewText}</Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Button className='font-body px-10 py-3' variant='contained' color='success' onClick={() => router.push('/Reviews')}>Read All Reviews</Button>
    </Box>
  );
};

export default ReviewBox;
