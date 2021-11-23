const express = require("express");
const db = require('../models/setup');
const categories = db.models.Category;
const app = express.Router();

app.post('/new', function (req, res) {

  const {
    name
    } = req.body;

    // const address2 = req.body.address2 || null
    // const district = req.body.district || null
    // const phone = req.body.phone || null

    categories.create({ 
    name,
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
    categories.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
    categories.findOne({
    where: {category_id: req.params.id}
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
    name,
    } = req.body;
     
    categories.update(
    {
        name
    },
    {
      where: {category_id: req.params.id}
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
    categories.destroy({
    where: {category_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;