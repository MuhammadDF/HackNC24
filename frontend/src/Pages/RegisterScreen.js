import React, { useState } from 'react';
import { Container, TextField, Typography, Button, LinearProgress, List, ListItem, IconButton } from '@mui/material';import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import axios from "axios";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [professor, setProfessor] = useState('');
  const [section, setSection] = useState('');
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

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

  const handleAddCourse = () => {
    const newCourse = { courseName, professor, section };
    setCourses([...courses, newCourse]);
    setCourseName('');
    setProfessor('');
    setSection('');
  };

  const handleRemoveCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleRegister = () => {
    axios.post("/api/user", {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      courses: courses,
      attendingEvents: []
    })
      .then((response) => {
        setUser(response.data);
        navigate('/events');
      })
  }

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Email" value={email} onChange={(e) => handleEmailChange(e.target.value)} fullWidth margin="normal" variant="outlined" error={!!emailError} helperText={emailError} />
      <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth margin="normal" variant="outlined"/>
      <TextField label="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} fullWidth margin="normal" variant="outlined" type="password" />
      <TextField label="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e.target.value)} fullWidth margin="normal" variant="outlined" type="password" error={!!passwordError} helperText={passwordError} />
      <Typography variant="body2" sx={{ mt: 2 }}>Password Strength:</Typography>
      <LinearProgress variant="determinate" value={(passwordStrength / 5) * 100} sx={{ height: 10, borderRadius: 1, my: 1 }} />
      {/* Course inputs */}
      <Typography variant="h6" sx={{ mt: 3 }}>Add Course</Typography>
      <TextField label="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Professor" value={professor} onChange={(e) => setProfessor(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <TextField label="Section" value={section} onChange={(e) => setSection(e.target.value)} fullWidth margin="normal" variant="outlined" />
      <Button variant="outlined" color="primary" onClick={handleAddCourse} fullWidth sx={{ mt: 2 }}>Add Course</Button>
      {/* Display added courses */}
      <List sx={{ mt: 2 }}>
        {courses.map((course, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" onClick={() => handleRemoveCourse(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            {course.courseName} - {course.professor} (Section {course.section})
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
      <Button variant="text" color="primary" fullWidth>
        Back to Login
      </Button>
    </Container>
  );
};

export default RegisterScreen;


