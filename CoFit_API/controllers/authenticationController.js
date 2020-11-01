var express = require('express');

// Login User
module.exports.login = function (req, res) {
    res.status(200).send(req.body);
}

module.exports.register = function (req,res) {
    res.status(200).send("hello");
}
