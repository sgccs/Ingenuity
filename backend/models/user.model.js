const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id : {type: String, required: true},
    details: {type: Object, required: true},
    date: { type: Date, required: true },
}, {
  timestamps: true,
});

const user = mongoose.model('user', userSchema);

module.exports = user;