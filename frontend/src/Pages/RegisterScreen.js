import React, { useState } from 'react';
import { Container, TextField, Typography, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailError(email === '' || validateEmail(email) ? '' : 'Email is invalid');
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    calculatePasswordStrength(password);
    setPasswordError(password === confirmPassword ? '' : "Passwords don't match");
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setPasswordError(password === confirmPassword ? '' : "Passwords don't match");
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Email" value={email} onChange={(e) => handleEmailChange(e.target.value)} fullWidth margin="normal" variant="outlined" error={!!emailError} helperText={emailError} />
      <TextField label="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} fullWidth margin="normal" variant="outlined" type="password" />
      <TextField label="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)} fullWidth margin="normal" variant="outlined" type="password" error={!!passwordError} helperText={passwordError} />
      <Typography variant="body2" sx={{ mt: 2 }}>Password Strength:</Typography>
      <LinearProgress variant="determinate" value={(passwordStrength / 5) * 100} sx={{ height: 10, borderRadius: 1, my: 1 }} />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
      <Button variant="text" color="primary" onClick={() => navigate('/')} fullWidth>
        Back to Login
      </Button>
    </Container>
  );
};

export default RegisterScreen;


