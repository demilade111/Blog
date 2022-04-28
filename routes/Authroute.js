const express = require("express");
const route = express.Router();

const {Login,Register} = require('../controlllers/authController');


route.post('/account/login',Login).post('/account/register',Register)


module.exports = route;