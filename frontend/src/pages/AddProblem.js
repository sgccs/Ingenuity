import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants';
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from '@mui/material';

const AddProblemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [constraints, setConstraints] = useState('');
  const [input, setInput] = useState(['']);
  const [output, setOutput] = useState(['']);
  const [verificationResult, setVerificationResult] = useState(null);


  const handleAddInput = () => {
    setInput([...input, '']);
  };

  const handleAddOutput = () => {
    setOutput([...output, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const problemData = {
      name,
      description,
      constraints,
      input,
      output,
    };
    console.log(problemData);
    const token = localStorage.getItem('token');
    axios
    .post(baseUrl + '/problem/add',problemData,{headers:{authorization: token, 'Access-Control-Allow-Origin': '*'}})
    .then((res) => {
      console.log(res);
      setVerificationResult('success');
      setName('');
      setConstraints('');
      setDescription('');
      setInput('');
      setOutput('');
    })
    .catch((err) => {
      setVerificationResult('error');

    })
    // Here, you can send `problemData` to your backend API to add the problem
  };

  const handleCloseSnackbar = () => {
    setVerificationResult(null);
  };

  return (
    <Container>
      <Typography variant="h4">Add New Problem</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Constraints"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              multiline
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Input Examples:</Typography>
            {input.map((inputValue, index) => (
              <TextField
                key={index}
                value={inputValue}
                onChange={(e) => {
                  const updatedInput = [...input];
                  updatedInput[index] = e.target.value;
                  setInput(updatedInput);
                }}
                fullWidth
                multiline
                required
              />
            ))}
            <Button onClick={handleAddInput} variant="outlined">
              Add Input Example
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Output Examples:</Typography>
            {output.map((outputValue, index) => (
              <TextField
                key={index}
                value={outputValue}
                onChange={(e) => {
                  const updatedOutput = [...output];
                  updatedOutput[index] = e.target.value;
                  setOutput(updatedOutput);
                }}
                fullWidth
                multiline
                required
              />
            ))}
            <Button onClick={handleAddOutput} variant="outlined">
              Add Output Example
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Problem
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={verificationResult !== null}
        autoHideDuration={5000} // Adjust the duration as needed (in milliseconds)
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={verificationResult === 'success' ? 'success' : 'error'}
        >
          {verificationResult === 'success' ? 'Problem added successful!' : 'Problem addition failed!'}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddProblemForm;
