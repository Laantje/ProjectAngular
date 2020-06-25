const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb+srv://Jorrit:Wijte1997.@memory-ayyl4.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, err => {
  if (err) {
    console.error('Error!' + err);
  } else {
    console.log('Connected to mongo db');
  }
})

function verifyToken(req, res, next) {
  if (!req.header.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  } 
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
  res.send('From api route');
})

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registerdUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = {
        subject: registerdUser._id
      }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({
    username: userData.username
  }, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send("Invalid username")
      } else
      if (user.password !== userData.password) {
        res.status(401).send("Invalid username or password")
      } else {
        let payload = {
          subject: user._id
        }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router;
