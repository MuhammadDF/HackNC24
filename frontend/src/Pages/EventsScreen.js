import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Modal, Box, TextField, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//NotificationsIcon, AddCircleIcon, SettingsIcon, searchQuery, handleSearch, SearchIcon
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

const EventsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useContext(UserContext);



  useEffect(() => {
    // Fetch events if needed
    // axios.get('/api/events').then(response => setEvents(response.data));
  }, []);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(UserContext);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    if (user && selectedEvent) {
      axios.post(`http://localhost:5000/events/${selectedEvent._id}/register`, { userId: user._id })
        .then((response) => {
          console.log(response.data.message);
          handleClose();
          // Refresh events data to show updated attendees count
          fetchEvents();
        })
        .catch((error) => console.error("Error registering for event:", error));
    }
  };

  const fetchEvents = () => {
    axios.get("http://localhost:5000/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filtering events based on search query
    const filtered = events.filter(
      (event) =>
        event.course.courseName.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.name.toLowerCase().includes(query)
    );
    setEvents(filtered);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Current Study Events</Typography>
          <div>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={toggleIsOpen}>
              <AddCircleIcon />
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <TextField
        label="Search events"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          endAdornment: <SearchIcon />
        }}
        sx={{ mb: 4 }}
      />

      {/* Events Grid */}
      <Grid container spacing={3}>
        {filteredEvents.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {event.course.courseName} - {event.course.courseCode}
                </Typography>
                <Typography variant="subtitle1">
                  Hosted by {event.fName} {event.lName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Location: {event.location}
                </Typography>
                <Typography variant="subtitle1">Hosted by {event.name}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>Location: {event.location}</Typography>
                <Typography variant="body2">Duration: {event.duration} hours</Typography>
                <Typography variant="body2">
                  Attendees: {event.attendees.length}/{event.cap}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleOpen(event)}
                >
                  Join Event
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Event Popup */}
      <EventPopup isOpen={isOpen} onClose={toggleIsOpen} />
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
            Register for {selectedEvent?.name}
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
            Confirm Registration
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default EventsScreen;
