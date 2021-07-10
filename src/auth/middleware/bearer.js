'use strict';
require('dotenv').config();

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  try {
    const token = req.headers.authorization.split(' ').pop();
    const user = await users.authenticateWithToken(token);

    req.user = user;

    req.token = user.token;
    next();

  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};
