import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginScreen from './Pages/LoginScreen';
import RegisterScreen from './Pages/RegisterScreen';
import EventsScreen from './Pages/EventsScreen';
import UserContext from './Contexts/UserContext'
import DummyUser from './Pages/DummyUser';

const theme = createTheme();

const App = () => {
  const [user, setUser] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <Routes>
            <Route path="/" element={<DummyUser />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/events" element={<EventsScreen />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;





