const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/user');
const Preset = require('../models/preset');
const Markers = require('../models/markers');
const Item = require('../models/items');
const mongoose = require('mongoose');
const markers = require('../models/markers');
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
      console.log(error.code);
      if(error.code == 11000 || error.code == 11001) {
        res.status(403).send("Already exists")
      }
    } else {
      let presetBody = '{ "username": "'+userData.username+'", "skin": 0, "hair": 0, "eyes": 0 }';
      let preset = new Preset(JSON.parse(presetBody));
      preset.save((error, registerdPreset) => {
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

router.get('/leaderboard', async (req, res, next) => {
  const result = await User.find({points: User.points})
                                 .sort({ points: 'desc'})
                                 .exists('points')
                                 .select('username points');
  res.status(200).json(result.map(entry => ({
    username: entry.username,
    points: entry.points
  })));
});


router.get('/markers', async(req, res) => {
  const result = await Markers.find({})
                                  .select('username latitude logitude description name')
    res.status(200).json(result)
  });

router.post('/markers',function (req, res){
  console.log('post a marker');
  var newMarker = new Markers()
  newMarker.username = req.body.username;
  newMarker.name = req.body.name;
  newMarker.latitude = req.body.latitude
  newMarker.longitude = req.body.longitude
  newMarker.description = req.body.description
  newMarker.save(function(err, insertedMarker){
    if (err){
      console.log('Error saving Marker')
    } else{
      res.json(insertedMarker)
    }
  })
  
})


module.exports = router;
