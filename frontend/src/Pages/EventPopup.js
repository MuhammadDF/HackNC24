// src/EventPopup.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Popup from './Popup'; // Assuming you have a Popup component

const EventPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [cap, setCap] = useState('');
  const [courseName, setCourseName] = useState('');
  const [professor, setProfessor] = useState('');
  const [section, setSection] = useState('');

  const handleCreateEvent = () => {
    const eventData = {
      name,
      description,
      duration: Number(duration),
      location,
      cap: Number(cap),
      course: {
        courseName,
        professor,
        section,
      },
      attendees: [],
    };

    fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Event created:", data);
        onClose(); // Close the popup on success
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>Create Event</Typography>
        <TextField
          label="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (in hours)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Capacity"
          type="number"
          value={cap}
          onChange={(e) => setCap(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" sx={{ mt: 2 }}>Course Details</Typography>
        <TextField
          label="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Professor"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Section"
          type="number"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleCreateEvent}>
            Create Event
          </Button>
        </Box>
      </Box>
    </Popup>
  );
};

export default EventPopup;
