'use client';

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
import Topdesign from './Topdesign';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function Login({onSubmitForm}) {
  const[userEmail, setUserEmail] = useState(null);
  const[password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitForm({userEmail:userEmail , password : password})
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Topdesign title="Log In" />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="User Email"
              name="username"
              autoComplete="usrname"
              autoFocus
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div class="flex items-center justify-between">
                <div>
                    <label class="inline-flex items-center mt-1">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-primary" />
                        <span class="ml-2">Remember me</span>
                    </label>
                </div>
                <div>
                    <a href="#" class="text-sm underline">Forgot password?</a>
                </div>
            </div>  

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:'black'}}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="CreateAccount" class="text-sm underline">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}