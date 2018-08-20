const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router
  .post('/regiser', (req, res) => {

  })

  .post('/request_token', (req, res) => {

  })

  .post('/items', (req, res) => {
    console.log(req.body);
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

  module.exports = router;
  