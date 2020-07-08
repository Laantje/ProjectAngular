const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/user');
const Preset = require('../models/preset');
const Markers = require('../models/markers');
const Items = require('../models/items');
const mongoose = require('mongoose');
const { exists } = require('../models/user');
const { Console } = require('console');
const db = "mongodb+srv://Jorrit:Wijte1997.@memory-ayyl4.mongodb.net/test?retryWrites=true&w=majority";
const itemCosts = [50, 250, 75, 50];

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


router.get('/markers', async(req, res, next) => {
  console.log()
  const result = await Markers.find({Markers: Markers.Markers})
                                  .select('username latitude longitude name description')
  res.status(200).json(result.map(entry => ({                             
    username: entry.username,
    latitude: entry.latitude,
    longitude: entry.longitude,
    name: entry.name,
    description: entry.description,
  })));
});

router.post('/markers',function (req, res){
  console.log('Post a marker');
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

router.put('/markers',function (req, res){
  console.log('Deleting marker with username: ' + req.body.username);
    Markers.deleteOne({ 'username': req.body.username }, (err, result) => {
      if (err)
          throw console.log(err);
      else 
        res.status(200);
    })
  })

  router.put('/preset', function (req, res) {
    console.log("GET PRESET");
    Preset.find({ 'username': req.body.username }, (err, result) => {
      if (err)
          throw console.log(err);
      else 
        res.status(200).json(result.map(entry => ({                             
          username: entry.username,
          skin: entry.skin,
          hair: entry.hair,
          eyes: entry.eyes
        })));
    }) 
  });

  router.post('/preset', function (req, res) {
    console.log("POST PRESET");
    console.log(req.body.skin);
    Preset.updateOne({ 'username': req.body.username, $set: {'skin': req.body.skin, 'hair': req.body.hair, 'eyes': req.body.eyes} }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200);
      }
    })
  });

  router.post('/items', (req, res) => {
    User.find({ 'username': req.body.username }, (err, user) => {
      if (err)
          throw console.log(err);
      else  {
        //Check if item exists
        if(req.body.itemid < 0 || req.body.itemid > itemCosts.length) {
          res.status(401).send("Doesn't exists.");
          return;
        }
        //Check money
        else if(user[0].balance < itemCosts[req.body.itemid-1]) {
          res.status(401).send("Not enough money.");
          return;
        }
        //Check if user already has item
        Items.findOne({ 'username': req.body.username, "itemid": req.body.itemid }, (err, items) => {
          if (err)
              throw console.log(err);
          else  {
              if(!items) {
                console.log(req.body.itemid);
                let itemBody = '{ "username": "'+req.body.username+'", "itemid": "'+req.body.itemid+'" }';
                let item = new Items(JSON.parse(itemBody));
                item.save((error, newItem) => {
                  if (error) {
                    console.log(error);
                  } else {
                    let newBalance = user[0].balance - itemCosts[req.body.itemid-1];
                    User.updateOne({ 'username': req.body.username, $set: {'balance': newBalance} }, (error) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("WORKS");
                    }
                  })
                  }
                })
              }
              else {
                res.status(401).send("Already bought.");
              }
          }
        }) 
      }
    }) 
  });

  router.put('/items', (req, res) => {
    console.log("GET ITEMS" + req.body.username);
    //find user
    User.find({ 'username': req.body.username }, (err, userPoints) => {
      if (err)
          throw console.log(err);
      else 
        //Return which items user has aleady bought
        Items.find({ 'username': req.body.username }, (err, result) => {
        if (err)
          throw console.log(err);
        else {
          if(!result[0]) {
            let pointsBody = '[{ "itemid": "", "points": "'+userPoints[0].balance+'" }, { "itemid": "", "points": "'+userPoints[0].balance+'" }]';
            let points = JSON.parse(pointsBody);
            res.status(200).json(points);
          } else {
            res.status(200).json(result.map(entry => ({                             
              itemid: entry.itemid,
              points: userPoints[0].balance
            })));
          } 
        }
      }) 
    }) 
  });

module.exports = router;
