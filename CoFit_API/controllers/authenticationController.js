var express = require('express');
const repository = require('../services/repository');

// Login User
module.exports.login = function (req, res) {

    //


    res.status(200).send(req.body);
}

module.exports.register = async function (req,res) {

    await repository.createUser(req.body)
        .then(x => {
            console.log('YEAH!')
            res.status(200).send();
        })
        .catch(x => {
            console.log('NOOO!')
            console.log(x);
            res.status(404).send();
        })
}
