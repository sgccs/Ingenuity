const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const problemSchema = new Schema({
    name:{ type: String, required: true},
    description: {type: String, required: true},
    constraints: {type: String, required: true},
    testcases: {type: [String], required: true},
    date: { type: Date, required: true },
}, {
  timestamps: true,
});

const problem = mongoose.model('problem', problemSchema);

module.exports = problem;