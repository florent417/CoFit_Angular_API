var express = require('express');
const repository = require('../services/repository');
const helpers = require('../helpers')

// Login User
module.exports.login = async function (req, res) {

    await repository.validateUserByUsernamePassword(req.body)
    .then(x => {
        console.log('correct');
        //Generate token

        var jwt = helpers.generatejwt(req.username)

        var userdto = {username: x.username, token: jwt}

        res.status(200).send(userdto);

    })
    .catch(z => {
        console.log('incorrect');
    })


    res.status(200).send(req.body);
}

module.exports.register = async function (req,res) {
    await repository.createUser(req.body)
        .then(x => {
            console.log('YEAH!')
            return res.status(200).send();
        })
        .catch(x => {
            console.log(x);
            return res.status(404).send();
        })
}

