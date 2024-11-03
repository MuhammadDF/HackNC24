import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, TextField, Grid, Card, CardContent, Button, Modal, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import mockEvents from '../mockEvents'; 
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const EventsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents); 
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("http://localhost:5000/events")
      .then(response => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  /*
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = mockEvents.filter(
      (event) =>
        event.course.courseName.toLowerCase().includes(query) ||
        event.fName.toLowerCase().includes(query) ||
        event.lName.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
    );

    setFilteredEvents(filtered);
  };
  */

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {event.course.courseName} - {event.course.professor} - {event.course.section}
                </Typography>
                <Typography variant="subtitle1">
                  Hosted by {event.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Location: {event.location}
                </Typography>
                <Typography variant="body2">Duration: {event.duration} hours</Typography>
                <Typography variant="body2">
                  Attendees: {event.attendees.length}/{event.cap}
                </Typography>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Join Event
                </Button>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Modal for Register Form */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2">
            Register for Event
          </Typography>
          <TextField
            fullWidth
            label="Your Name"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Your Email"
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default EventsScreen;