const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    problemID:{ type: Schema.Types.ObjectId, ref: 'problem' },
    userID:{ type: Schema.Types.String, ref: 'user' },
    code:{ type: String, required: true},
    verdict: {type: String, required: true},
    score: {type: Number, required: true},
    input: {type: [String], required: true},
    output: {type: [String], required: true},
    date: { type: Date, required: true },
}, {
  timestamps: true,
});

const submission = mongoose.model('submission', submissionSchema);

module.exports = submission;