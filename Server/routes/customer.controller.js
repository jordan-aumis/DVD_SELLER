const express = require("express");
const db = require('../models/setup');
const customers = db.models.Customer;
const app = express.Router();

app.post('/new', function (req, res) {

  const {
    birthDate,
    isAdult,
    UserUserId
    } = req.body;

    customers.create({ 
        birthDate,
        isAdult,
        UserUserId
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
    customers.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
    customers.findOne({
    where: {customer_id: req.params.id}
  })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/byUserId/:id', function (req, res) {
  customers.findOne({
  where: {UserUserId: req.params.id}
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
    birthDate,
    isAdult,
    UserUserId
    } = req.body;
     
    customers.update(
    {
        birthDate,
        isAdult,
        UserUserId
    },
    {
      where: {customer_id: req.params.id}
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
    customers.destroy({
    where: {customer_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;