'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';

//import star design from asset
import stars from '../../assets/star.jpg'

const defaultTheme = createTheme();

export default function SignUpPersonalInfo({setTab , setSubmitForm, submitForm}) {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setTab(1)
  };
  function handleChange(newvalue, key){
    setSubmitForm({...submitForm, [key]:newvalue})
    console.log(submitForm)
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <IconButton onClick={() => router.push('/')}>
          <ArrowBack className='mt-4 float-left'/>
        </IconButton>
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  value={submitForm.firstName }
                  onChange={(e) => handleChange(e.target.value , 'firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  value={submitForm.lastName}
                  onChange={(e) => handleChange(e.target.value , 'lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="userContactNumber"
                  required
                  fullWidth
                  label="Phone Number"
                  value={submitForm.userContactNumber}
                  onChange={(e) => handleChange(e.target.value , 'userContactNumber')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="userEmail"
                  required
                  fullWidth
                  label="Email Address"
                  value={submitForm.userEmail}
                  onChange={(e) => handleChange(e.target.value , 'userEmail')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  label="Username"
                  type="username"
                  value={submitForm.userName}
                  onChange={(e) => handleChange(e.target.value , 'userName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={submitForm.password}
                  onChange={(e) => handleChange(e.target.value , 'password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 , py:2,width: '100%'  }}
              style={{backgroundColor:'black'}}

            >
              Continue
            </Button>
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