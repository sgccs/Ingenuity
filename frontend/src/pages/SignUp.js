import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import emailValidator from 'email-validator'; // Import the email validator library
import Modal from '@mui/material/Modal';

const Signup = () => {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State for the modal visibility


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
        setErrorMessage('Email has been sent to your email! please authenticate your accout before logging in!');
        setShowModal(true);
        //navigate(`/verify/`);
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
      already having an account <a href='/#/login' style={{textDecoration: 'none' }}>Login</a> 
      </div>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)} // Close the modal when the user clicks outside
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <Typography variant="h6" id="modal-title">
            Success!
          </Typography>
          <Typography variant="body1" id="modal-description">
            {errorMessage}
          </Typography>
          <Button onClick={() => setShowModal(false)}>OK</Button> {/* Add a button to close the modal */}
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
