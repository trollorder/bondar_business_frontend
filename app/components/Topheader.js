'use client'

import React from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';


export default function TopHeader({ businessName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header style={{ width: '100%', position: 'fixed', top: 0, backgroundColor: '#b82a66', zIndex: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <div>
          <div className='px-4'style={{ backgroundColor: 'white', borderRadius: '50%', padding: '5px', display: 'inline-block' }}>
            <MenuIcon onClick={handleClick} style={{ cursor: 'pointer', color: 'pink' }} />
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <List>
            <ListItem>
                <Button href="/page1" onClick={handleClose}>
                <ListItemText primary="FAQ" primaryTypographyProps={{ style: { color: 'pink' } }}/>
                </Button>
            </ListItem>
            <ListItem>
                <Button href="/page2" onClick={handleClose}>
                <ListItemText primary="Help" primaryTypographyProps={{ style: { color: 'pink' } }}/>
                </Button>
            </ListItem>
            <ListItem>
                <Button href="/page2" onClick={handleClose}>
                <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: 'pink' } }}/>
                </Button>
            </ListItem>
            </List>

          </Popover>
        </div>
        <div style={{ fontWeight: 'bold', color: 'white', fontSize: '25px' }}>{businessName}</div>
      </div>
    </header>
  );
}

