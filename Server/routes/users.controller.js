const express = require("express");
const db = require('../models/setup');
const users = db.models.User;
const app = express.Router();

app.post('/new', function (req, res) {
    
  const {
    firstName,
    userName,
    lastName,
    email,
    password,
    AddressAddressId,
    } = req.body;
  
    users.create({ 
    firstName,
    userName,
    lastName,
    email,
    password,
    AddressAddressId
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
    users.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
  users.findOne({
    where: {user_id: req.params.id}
  })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.patch('/:id/update', (req, res)=>{
  
  const { 
    firstName,
    userName,
    lastName,
    AddressAddressId
    } = req.body;
     
		users.update(
    {
        firstName,
        userName,
        lastName,
        AddressAddressId
    },
    {
      where: {user_id: req.params.id}
    }
  )
  .then((data) => {
    res.status(200).json({data})
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

app.delete('/:id/delete', (req, res)=>{
    users.destroy({
    where: {user_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;