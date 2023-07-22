const express = require('express');
const cors = require('cors');
const services = require("./services");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// console.log(uri);
// mongoose.connect("mongodb+srv://josyulavenkata:sept172002@cluster0.gk1ahkb.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get("/ping", (req, res) => {
    res.send({status: "healthy"}).status(200);
})

app.get('/problems', (req, res) => {
    listProblems(req, res);

});

app.post('/problem/add', (req, res) => {
    addProblem(req, res);
}); 

app.get('/problems/:id', (req, res) => {
    getProblem(req, res);

});

app.get('/submissions/:id', (req, res) => {
    listSubmissions(req, res);

}); // this list's all the submissions for a particular problem

app.get('/submission/:id', (req,res) => {
    getSubmission(req,res);
}); // this will return a particular submission

app.post('/submission' , (req,res) =>{
    addSubmission(req,res);
})

app.post('/user/add', (req,res) =>{
    addUser(req,res);
})

const listProblems = (req,res) => {
    services.listProblems().then((data) =>{
        res.send(data).status(200);
    })
    .catch(err => {
        res.send(err).status(500);
    }) 
};

const addProblem = (req,res) =>{
    const data = req.body;
    console.log(req.body);
    services.addProblem(data).then((data) => {
        res.send(data).status(201);
    })
    .catch(err => {
        res.send(err).status(500);
    })
};

const getProblem = (req, res) => {
    const id = req.params['id'];
    services.getProblem(id).then((data) =>{
        res.send(data).status(200);
    })
    .catch(err => {
        res.send(err).status(500);
    }) 
};


const listSubmissions = (req,res) => {
    const id = req.params['id'];
    services.listSubmissions(id).then((data) =>{
        res.send(data).status(200);
    })
    .catch(err => {
        res.send(err).status(500);
    }) 
};

const addSubmission = (req,res) => {
    const data = req.body;
    services.addSubmission(data).then((data) =>{
        res.send(data).status(200);
    })
    .catch(err => {
        res.send(err).status(500);
    })
};

const getSubmission = (req,res) => {
    const id = req.params['id'];
    services.getSubmission(id).then((data) => {
        res.send(data).status(200);
    })
    .catch(err => {
        res.send(err).status(500);
    })
};

const addUser = (req,res) => {
    const data = req.body;
    console.log(req.body);
    services.addUser(data).then((data) => {
        res.send(data).status(201);
    })
    .catch(err => {
        res.send(err).status(500);
    })
};