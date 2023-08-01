const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;


const isvalid  = (token) => {
    return new Promise((resolve,reject) => {
        if (!token) {
            return reject(false);
          }
        
          jwt.verify(token, secretKey, (err, user) => {
            if (err) {
            return reject(false);
            }
            resolve(true);
          });
    })
};

module.exports = {isvalid};