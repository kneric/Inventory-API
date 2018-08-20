const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router
  .post('/register', (req, res) => {
    const {username, password} = req.body;

    User.create({
      username, password
    })
    .then(createdUser => {
      res.status(201).json({success: true, message: `Account ${createdUser.username} registered`})
    })
    .catch(err => {
      res.status(500).json({message: err});
    })
  })

  .post('/request_token', (req, res) => {
    const {username, password} = req.body;

    User.findOne({username})
    .then (user => {
      if (user){
        user.checkPwd(password, (isMatched)=> {
          if(isMatched){
            let token = jwt.sign({
              _id: user._id, 
              username: user.username
            }, process.env.secretKey)
            res.status(201).json({
              token
            })
          } else {
            res.status(403).json({message:'email / password is incorrect'})
          }
        })
      } else {
        res.status(404).json({message: 'User not found'});
      }
    })
    .catch(err => {
      res.status(500).json({message: err.message});
    })
  })

  .post('/items', (req, res) => {
    const {name, price, stock, tags} = req.body

    Item.create({
      name, price, stock, tags
    })
    .then(createdItem => {
      res.status(201).json(createdItem)
    })
    .catch(err => {
      res.status(500).json({message: err});
    })
  })

  .get('/', (req, res) => {
    let q = req.query.query;

    if (q){

    } else {
      Item.find()
      .then (items => {
        res.status(200).json(items)
      })
      .catch (err =>{
        res.status(500).json({message: err});
      })
    }
  })

  .post('/decode', (req, res) => {
    let loggedInUser = jwt.verify(req.body.token, process.env.secretKey);
    res.status(200).json(loggedInUser);
  })

  module.exports = router;
  