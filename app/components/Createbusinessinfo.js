'use client';

import Image from 'next/image';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, Button, CssBaseline, Link,TextField,Grid,Box,Container } from '@mui/material';

//import star design from asset
import stars from '../../assets/star.jpg'

const defaultTheme = createTheme();

export default function SignUpBusinessInfo({setTab,onSubmitForm,submitForm, setSubmitForm}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmitForm()
  };

  async function handleChange(newvalue, key){
    const hi  = await setSubmitForm({...submitForm, [key]:newvalue})
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <IconButton onClick={()=> setTab(0)}>
          <ArrowBack className='mt-4 float-left'/>
        </IconButton>
        <CssBaseline />

        <Image
            src={stars}
            alt="star"
            width={50}
            height={50}
            class='float-right mt-[2rem]'
        />
        <p class='text-left font-bold text-3xl mt-8'>Create Account</p>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={6}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="businessName"
                  label="Business Name"
                  name="businessName"
                  autoComplete="businessName"
                  value={submitForm.businessName}
                  onChange={(e) => handleChange(e.target.value, 'companyName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={submitForm.country}
                  onChange={(e) => handleChange(e.target.value, 'companyCountry')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="businessAddress"
                  label="Business Address"
                  name="businessAddress"
                  autoComplete="businessAddress"
                  value={submitForm.businessAddress}
                  onChange={(e) => handleChange(e.target.value, 'companyAddress')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="zipCode"
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  value={submitForm.zipCode}
                  onChange={(e) => handleChange(e.target.value, 'companyZip')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  value={submitForm.state}
                  onChange={(e) => handleChange(e.target.value, 'companyState')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="businessPhoneNumber"
                  label="Business Phone Number"
                  name="businessPhoneNumber"
                  autoComplete="businessPhoneNumber"
                  value={submitForm.businessPhoneNumber}
                  onChange={(e) => handleChange(e.target.value, 'companyContactNumber')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="businessEmail"
                  label="Business Email Address"
                  name="businessEmail"
                  autoComplete="businessEmail"
                  value={submitForm.businessEmail}
                  onChange={(e) => handleChange(e.target.value, 'companyEmail')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="businessType"
                  label="Business Type"
                  type="businessType"
                  id="businessType"
                  value={submitForm.businessType}
                  onChange={(e) => handleChange(e.target.value, 'companyType')}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 , py:2,width: '100%'  }}
                style={{backgroundColor:'black'}}
                className='rounded-xl'

              >
                Create Account
              </Button>
            </Box>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}