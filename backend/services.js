const { connection } = require("./db");
const router = require("express").Router();
let problems = require("./models/problem.model");
let users = require("./models/user.model");
let submissions = require("./models/submission.model");

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
    const verdict = data.verdict;
    const score = data.score;
    const input = data.input;
    const output = data.output;
    const date = Date.now();
  
    const submission = new submissions({
      problemID,
      userID,
      code,
      verdict,
      score,
      input,
      output,
      date,
    });
    submission.save().then((data) =>{
      console.log(data);
      resolve('Submission added sucessfully!')
    })
    .catch(err => reject(err));
      console.log("services.addSubmission : added submission succesfully!");
  })
}

const addUser = (data) => {
  // details: {type: Object, required: true},
  // date: { type: Date, required: true },
  return new Promise((resolve, reject) => {
    const _id = data._id;
    const details = data.details;
    const date = Date.now();
    const user = new users({
        _id,
        details,
        date,
    });
    user.save()
    .then((data) =>  {
      console.log(data);
      resolve('User added successfully!')
    })
    .catch(err => reject(err));
    console.log("services.addUser : added user succesfully!");
  })
}

module.exports = { listProblems, getProblem, listSubmissions, addProblem, addSubmission, addUser};
