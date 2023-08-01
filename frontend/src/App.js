import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Problems from './pages/Problems';
import CodeView from './pages/CodeView';
import Submissionslist from './pages/Submissions';
import Viewsubmission from './pages/ViewSubmission';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import LogOut from './components/LogOut';
import UserSubmissions from './pages/UserSubmissions';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [username,setUserName] = useState(''||localStorage.getItem('username'));

  const validUser = () => {
    setIsLoggedIn(true);
    setUserName(localStorage.getItem('username'));
  };

  const invalidUser = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <div className="App">
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '50px 50px 20px', // Reduced bottom margin
        backgroundColor: '#f0f0f0', // Background color
        padding: '10px' // Added padding for better spacing
      }}
    >
      {/* Top-Left Container */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/images/Introduction to STL libraries and Bit manipulation.png" alt="Logo" width="50" height="50" />
        <h1 style={{ color: '#4a148c', marginLeft: '10px' }}>Ingenuity</h1>
      </div >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLoggedIn &&(
          <a href='/problems' style={{ marginLeft: '5px', animation: 'rainbow 5s infinite', textDecoration: 'none' }}>problems</a>
          )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLoggedIn &&(
          <a href='/usersubmissions' style={{ marginLeft: '5px', animation: 'rainbow 5s infinite', textDecoration: 'none' }}>submissions</a>
          )}
      </div>
      {/* Top-Right Container */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLoggedIn && (
          <>
            <p style={{ color: '#4a148c', marginRight: '10px', animation: 'rainbow 5s infinite' }}>
              Welcome,
              <a href="/profile" style={{ marginLeft: '5px', animation: 'rainbow 5s infinite', textDecoration: 'none' }}>
                {username}
              </a>
            </p>
            <LogOut handleLogout={handleLogout} />
          </>
        )}
      </div>
    </div>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/problems" /> : <Login validUser={validUser} invalidUser={invalidUser} isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={!isLoggedIn ?<Signup />:<Navigate to="/problems" />} />
          <Route
            path="/problems"
            element={isLoggedIn ? <Problems  /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/problem/:id"
            element={isLoggedIn ? <CodeView username={username}/> : <Navigate to="/login" replace />}
          />
          <Route
            path="/submissions/:id"
            element={isLoggedIn ? <Submissionslist /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/submission/:id"
            element={isLoggedIn ? <Viewsubmission /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/usersubmissions"
            element={isLoggedIn ? <UserSubmissions  /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/logout"
            element={isLoggedIn ? <LogOut/> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
