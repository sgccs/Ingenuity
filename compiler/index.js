const cors = require('cors');
const express = require('express');
const service =  require('./service')
const app = express();


const port = 3001; // Change this to your desired port

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Assuming you have a route to handle code compilation requests
app.post('/compile', (req, res) => {
  const data = req.body; // Assuming the code is sent in the request body
  console.log("data >>" + JSON.stringify(data));
  // Create a new container using the docker image you built
    service.dockerCreation(data).then((data) => {
        res.send(data).status(201);
    })
    .catch(err => {
        console.log(err);
    })
    
});

