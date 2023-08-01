const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const services = require("./services");
const validate = require("./validation");
const User = require('./models/user.model');
const secretKey = process.env.JWT_SECRET;

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
  res.send({ status: "healthy" }).status(200);
});

app.get("/problems", (req, res) => {
  listProblems(req, res);
});

app.post("/problem/add", (req, res) => {
  addProblem(req, res);
});

app.get("/problems/:id", (req, res) => {
  getProblem(req, res);
});

app.get("/submissions/:id", (req, res) => {
  listSubmissions(req, res);
}); // this list's all the submissions for a particular problem

app.get("/submission/:id", (req, res) => {
  getSubmission(req, res);
}); // this will return a particular submission

app.post("/submission", (req, res) => {
  addSubmission(req, res);
});

app.post("/run", (req,res) => {
  run(req,res);
});

 
app.post("/signup", (req, res) =>{
    signup(req, res);
});

app.post("/login", (req,res) => {
    login(req,res);
});


const listProblems = (req, res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      console.log('authrozied sucessfully');
      services
        .listProblems()
        .then((data) => {
          res.send(data).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else{
      console.log('not authrorized')
      res.status(401).send("not authorized");
    } 
  }).catch(err => res.status(401).send(err));
};

const addProblem = (req, res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      const data = req.body;
      console.log(req.body);
      services
        .addProblem(data)
        .then((data) => {
          res.send(data).status(201);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else res.status(401).send("not authorized");
  });
};

const getProblem = (req, res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      const id = req.params["id"];
      services
        .getProblem(id)
        .then((data) => {
          res.send(data).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else {
      res.status(401).send("not authorized");
    }
  });
};

const listSubmissions = (req, res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      const id = req.params["id"];
      services
        .listSubmissions(id)
        .then((data) => {
          res.send(data).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else res.status(401).send("not authorized");
  });
};

const addSubmission = (req, res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      const data = req.body;
      services
        .addSubmission(data)
        .then((data) => {
          res.send(data).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else res.status(401).send("not authorized");
  });
};

const run = (req,res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      const data = req.body;
      services
        .run(data)
        .then((data) => {
          res.send(data).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else res.status(401).send("not authorized");
});
};

const getSubmission = (req, res) => {
  authorizeRequest(req).then((data) => {
    if (data) {
      const id = req.params["id"];
      services
        .getSubmission(id)
        .then((data) => {
          res.send(data).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
        });
    } else res.status(401).send("not authorized");
  });
};


const login = (req,res) => {
    const data = req.body;
    return services.verifyUser(data).then((data) => {
        res.send(data).status(200);
    })
    .catch((err) => {
      console.log('error in index');
        res.send(err).status(401);
    })
    
}

const signup = (req, res) => {
    const data = req.body;
    services
    .addUser(data)
    .then((data) => {
        res.json('User added successfully!');
    })
    .catch((err) => {
      res.send(err).status(500);
    });
}

const authorizeRequest = (req) => {
  const token = req.headers.authorization;
  return validate.isvalid(token);
};
