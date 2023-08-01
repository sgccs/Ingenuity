require('dotenv').config();
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const axios = require('axios');
const { connection } = require("./db");
const router = require("express").Router();
let problems = require("./models/problem.model");
let users = require("./models/user.model");
let submissions = require("./models/submission.model");
const submission = require('./models/submission.model');
const secretKey = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const listProblems = () => {
  return new Promise((resolve,reject) => {
    problems.find()
    .then((problems) => {
      resolve(problems)
    })
    .catch((err) => reject(err));
    console.log("listProblems");
  })
};

const addProblem = (data) =>{
  // name:{ type: String, required: true},
    // description: {type: String, required: true},
    // constraints: {type: String, required: true},
    // testcases: {type: [String], required: true},
    // date: { type: Date, required: true },
    
    return new Promise((resolve, reject) => {
      const name =  data.name;
      const description = data.description;
      const constraints = data.constraints;
      const input = data.input;
      const output = data.output;
      const date = Date.now();
      const problem = new problems({
        name,
          description,
          constraints,
          input,
          output,
          date,
      });
      problem.save()
      .then((data) =>  {
        console.log(data);
        resolve('problem added successfully!')
      })
      .catch(err => reject(err));
      console.log("services.addProblem : added problem succesfully!");
    })
    
    
  };
  
  const getProblem = (id) => {
    return new Promise((resolve, reject) => {
      
      problems.findById(id).then((problem) => {
        console.log(problem);
        resolve(problem);
    }) 
    .catch(err => reject(err));
    console.log("services.getProblem : feteched problem successfully!!")
  })
};

const listSubmissions = (id) => {
  return new Promise((resolve, reject) => {

    submissions.find({problemID:id}).then((submission) => {
      console.log(submission);
      resolve(submission);
    }) 
    .catch(err => reject(err));
    console.log("services.listSubmissions : feteched submission successfully!!")
  })
};

const addSubmission = (data) => {
  // problemID:{ type: Schema.Types.ObjectId, ref: 'problem' },
  // userID:{ type: Schema.Types.ObjectId, ref: 'user' },
  // code:{ type: String, required: true},
  // verdict: {type: String, required: true},
  // score: {type: Number, required: true},
  // testcases: {type: [String], required: true},
  // date: { type: Date, required: true },
  return new Promise((resolve, reject) => {
    const problemID = data.problemID;
    const userID = data.userID;
    const code = data.code;
    const language = data.language;
    const input = data.input;
    const output = data.output;
    const date = Date.now();
    const basename = problemID+'_'+userID+'_'+date;
    const filename = problemID+'_'+userID+'_'+date+'.'+language;
    fs.writeFileSync(path.join(__dirname,'usersubmissions/'+filename), code, 'utf8');
    const body = {filename, input, output,code};
    axios.post('http://localhost:3001/compile',body,{headers:{'Access-Control-Allow-Origin': '*'}}).then((data) => {
      const userOutput = fs.readFileSync(path.join(__dirname,'usersubmissions/'+basename+'.'+'txt'),'utf8').split('~\n').slice(0,-1);
      let verdict = "";
      for(i = 0;i<output.length;i++){
        if(output[i] != userOutput[i]){
          verdict = "WA";
          break;
        }
        // timelimit to be checked;
      }
      if(verdict == "") verdict = "AC";
      const submission = new submissions({
        problemID,
        userID,
        code,
        verdict,
        language,
        input,
        output,
        date,
      });
      console.log(verdict, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(userOutput);
      // data.userOutput = userOutput; 
      submission.save().then((data) =>{
        const test = {verdict : data.verdict,userOutput};
        resolve(test);
        console.log(userOutput);
        console.log(data);
        const folderPath = path.join(__dirname, 'usersubmissions');
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            console.error('Error reading folder:', err);
            return;
          }
        
          files.forEach((file) => {
            // Check if the file is not a .sh file
            if (!file.endsWith('.sh')) {
              const filePath = path.join(folderPath, file);
        
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                } else {
                  console.log('File deleted:', file);
                }
              });
            }
          });
        });
  });
    });

});
};

const run = (data) => {
  return new Promise((resolve,reject) => {
    const problemID = data.problemID;
    const userID = data.userID;
    const code = data.code;
    const language = data.language;
    const input = [data.input];
    const output = '';
    const date = Date.now();
    const basename = problemID+'_'+userID+'_'+date;
    const filename = problemID+'_'+userID+'_'+date+'.'+language;
    fs.writeFileSync(path.join(__dirname,'usersubmissions/'+filename), code, 'utf8');
    const body = {filename, input,output,code};
    console.log(input);
    axios.post('http://localhost:3001/compile',body,{headers:{'Access-Control-Allow-Origin': '*'}}).then((data) => {
      const userOutput = fs.readFileSync(path.join(__dirname,'usersubmissions/'+basename+'.'+'txt'),'utf8').split('~\n').slice(0,-1);
      console.log(userOutput);
        const test = {userOutput};
        resolve(test);
        console.log(userOutput);
        const folderPath = path.join(__dirname, 'usersubmissions');
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            console.error('Error reading folder:', err);
            return;
          }
          files.forEach((file) => {
            // Check if the file is not a .sh file
            if (!file.endsWith('.sh')) {
              const filePath = path.join(folderPath, file);
        
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                } else {
                  console.log('File deleted:', file);
                }
              });
            }
          });
        });
    });

  });
};

const getSubmission = (id) => {
  return new Promise((resolve, reject) => {
    
    submissions.findById(id).then((problem) => {
      console.log(problem);
      resolve(problem);
    }) 
    .catch(err => reject(err));
    console.log("services.getsubmission : feteched submission successfully!!")
  })
};

const getSubmissions = (id) => {
  return new Promise((resolve,reject) => {
    submissions.find({ userID: id }).then((submission) => {
      console.log(submission);
      resolve(submission);
    })
    .catch(err => reject(err));
    console.log("services.getsubmissions : feteched submission successfully!!")
  })
};


const addUser = (data) => {
  return new Promise((resolve, reject) => {
    users.findOne({ $or: [{ _id: data.username }, { 'details.email': data.details.email }] })
    .then((existingUser) => {
      if (existingUser) {
        return reject('User already exists.');
      }

      // Hash the password before saving it
      bcrypt.hash(data.password, saltRounds, (hashErr, hashedPassword) => {
        if (hashErr) {
          return reject('Error hashing password.');
        }

        const _id = data.username;
        const password = hashedPassword; // Store the hashed password in the database
        const type = "User";
        const details = data.details;
        const date = Date.now();

        const user = new users({
          _id,
          password,
          type,
          details,
          date,
        });

        user.save()
        .then((data) =>  {
          console.log(data);
          resolve('User added successfully!');
        })
        .catch(err => reject(err));

        console.log("services.addUser : added user successfully!");
      });
    })
    .catch((findErr) => {
      console.log(findErr);
      reject('Error finding existing user.');
    });
  });
};

const verifyUser = (data) => {
  return new Promise((resolve, reject) => {
    users.findById(data.username)
      .then((user) => {
        if (!user) {
          return reject('Invalid user.');
        }

        // Compare the provided password with the hashed password in the database
        console.log(data.password , user.password);
        bcrypt.compare(data.password, user.password, (compareErr, isMatch) => {
          if (compareErr) {
            return reject('Error comparing passwords.');
          }
          if (isMatch) {
            const token = jwt.sign({ username: data.username }, secretKey, { expiresIn: '1h' });
            resolve({ token, username: data.username });
          } else {
            reject('Invalid password.');
          }
        });
      })
      .catch((err) => {
        console.log('in catch', err);
        reject('Error finding user.', err);
      });
  });
};

module.exports = { listProblems, getProblem, listSubmissions, addProblem, addSubmission, run, addUser, getSubmission, getSubmissions, verifyUser};
