const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: "backend/.env"});

const uri = process.env.ATLAS_URI || "mongodb+srv://josyulavenkata:sept172002@ingenuity.dpmwhke.mongodb.net/Ingenuity?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

module.exports = {connection};