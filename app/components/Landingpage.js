'use client';
import Image from 'next/image'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from "../../assets/logo.jpg"
import { useRouter } from 'next/navigation';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LandingPage() {
  const router = useRouter();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={logo}
            alt="logo"
          />
          <Typography component="h1" variant="h4" className='font-bold'>
            Welcome to Bondar👋
          </Typography>
          <h4 className=''>Explore the bondar</h4>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              type="signin"
              fullWidth
              variant="outlined"
              sx={{ mt: 5, mb: 1 }}
              onClick={(e) => 
                {
                  e.preventDefault();
                  router.push('/CreateAccount')
                }
              }
              style={{color:'black', borderColor:'black'}}
            >
              Create Account
            </Button>

            <Button
              type="signin"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={(e) => 
                {
                  e.preventDefault();
                  router.push('/SignIn')
                }
              }
              style={{backgroundColor:'black'}}
            >
              Log In   
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}