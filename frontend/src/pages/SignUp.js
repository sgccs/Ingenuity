import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import emailValidator from 'email-validator'; // Import the email validator library
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {

    // Validate email format using the email-validator library
    if (!emailValidator.validate(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const userData = {
      username,
      password,
      details: { email, phoneNumber },
    };

    // You should add validation for the fields before making the signup request.
    // For example, check if the passwords match, if the email is valid, etc.

    axios
      .post(baseUrl + '/signup', userData)
      .then((res,err) => {
        // Handle the successful signup here, e.g., show a success message, redirect, etc.
        console.log(err);
        if(err)  setErrorMessage('Signup failed. Please try again.');
        else{
        console.log(res.data);
        setErrorMessage('Signup successful! Please login again with the credentials.');
        navigate(`/login`);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Signup failed. Please try again.');
      });
  };

  return (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <Typography variant="h4">Signup</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <TextField required
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField required
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="tel"
          label="Phone number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField required
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField required
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        { (password === passwordConfirmation) && (
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Signup
        </Button>
        )
        }
      </div>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </div>
  );
};

export default Signup;
