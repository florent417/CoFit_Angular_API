const jwt = require('jsonwebtoken');

function generatejwt(username){
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    return jwt.sign({
        name: username,
        exp: parseInt(expiry.getTime() / 1000)},
        process.env.secretKey)
}