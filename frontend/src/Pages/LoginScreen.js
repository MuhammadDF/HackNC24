import React, { useState } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const {user, setUser} = useContext(UserContext);
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
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        email: email, 
        password: password
      })
      
      
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then((data) => {
      setUser(data);
      navigate('/events');
  })
  .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
  });
  
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
        <Button variant="contained" color="primary" fullWidth onClick={handleLogIn}>
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/register')}
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
