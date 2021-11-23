const express = require("express");
const db = require('../models/setup');
const purchases = db.models.Purchase;
const app = express.Router();

app.post('/new', function (req, res) {

  const {
    amount,
    purchaseDate,
    CustomerCustomerId,
    StaffStaffId
    } = req.body;

    purchases.create({ 
        amount,
        purchaseDate,
        CustomerCustomerId,
        StaffStaffId
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
    purchases.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
    purchases.findOne({
    where: {purchase_id: req.params.id}
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
    amount,
    purchaseDate,
    CustomerCustomerId,
    StaffStaffId
    } = req.body;
     
    purchases.update(
    {
        amount,
        purchaseDate,
        CustomerCustomerId,
        StaffStaffId
    },
    {
      where: {purchase_id: req.params.id}
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
    purchases.destroy({
    where: {purchase_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;