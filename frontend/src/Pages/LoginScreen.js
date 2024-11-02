import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(email === '' || validateEmail(email) ? '' : 'Email is invalid');
  };

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
          variant="contained"
          color="primary"
          onClick={() => navigate('/register')}
          fullWidth
          sx={{ mt: 1 }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/events')}
          fullWidth
          sx={{ mt: 1 }}
        >
          Test
        </Button>
      </Box>
    </Container>
  );
};

export default LoginScreen;
