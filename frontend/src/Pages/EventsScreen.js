import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, TextField, Grid, Card, CardContent, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import mockEvents from '../mockEvents'; 
import EventPopup from './EventPopup'; // Import the EventPopup component
import axios from "axios";
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';

const EventsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents); 
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

      {/* Event Popup */}
      <EventPopup isOpen={isOpen} onClose={toggleIsOpen} />
    </Container>
  );
};

export default EventsScreen;
