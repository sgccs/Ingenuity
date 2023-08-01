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
        <div>
          <h1>Ingenuity</h1>
          {isLoggedIn && <LogOut handleLogout={handleLogout} />}
        </div>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/problems" /> : <Login validUser={validUser} invalidUser={invalidUser} isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
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
            path="/logout"
            element={isLoggedIn ? <LogOut/> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
