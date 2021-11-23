const express = require("express");
const db = require('../models/setup');
const addresses = db.models.Address;
const app = express.Router();

app.post('/new', function (req, res) {
    
  const {
    address,
    city,
    postalCode,
    } = req.body;

    const address2 = req.body.address2 || null
    const district = req.body.district || null
    const phone = req.body.phone || null

    addresses.create({ 
    address,
    address2,
    district,
    phone,
    city,
    postalCode,
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
    addresses.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
    addresses.findOne({
    where: {address_id: req.params.id}
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
    address,
    address2,
    district,
    phone,
    city,
    postalCode,
    } = req.body;
     
    addresses.update(
    {
        address,
        address2,
        district,
        phone,
        city,
        postalCode,
    },
    {
      where: {address_id: req.params.id}
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
    addresses.destroy({
    where: {address_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;