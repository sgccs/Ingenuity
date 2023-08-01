import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const userData = {
      username,
      password,
    };

    axios
      .post(baseUrl + '/login', userData)
      .then((res) => {
        const token = res.data.token;
        const username = res.data.username;
        // Save the token to local storage or session storage for future requests
        if(token){
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          props.validUser();
        }
        else{
          props.invalidUser();
        setErrorMessage('Invalid username or password');
        }
        console.log(token);
        // Redirect to the problems page or any other protected route
        // window.location.href = '/problems';
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Invalid username or password');
        props.invalidUser();
      });
  };

  return (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <Typography variant="h4">Login</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        create a new account <a href='/#/signup'>Signup</a>
      </div>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </div>
  );
};

export default Login;
