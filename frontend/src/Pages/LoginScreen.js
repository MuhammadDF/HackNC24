import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [user,setUser] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(email === '' || validateEmail(email) ? '' : 'Email is invalid');
  };

  const handleLogIn = () => {
    axios.get("/api/user", {
      params: {
        email: email,
        password: password
      }
    })
      .then((response) => {
        setUser(response.data);
        navigate('/events');
      })
  }

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={handleLogIn}
          fullWidth
          sx={{ mt: 1 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default LoginScreen;
