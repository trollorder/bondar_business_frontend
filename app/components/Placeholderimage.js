import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function HorizontalScrollableImageList() {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <ImageList sx={{ minWidth: '100%', flexDirection: 'row', height:'20vh'}} cols={0} rowHeight="auto" className='flex'>
        {itemData.map((item) => (
          <ImageListItem key={item.img} style={{ display: 'inline-block', height:'20vh' }} >
            <img
              srcSet={`${item.img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`} // Adjusted width and height
              src={`${item.img}?w=300&h=300&fit=crop&auto=format`} // Adjusted width and height
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
];

