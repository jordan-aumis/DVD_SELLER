const express = require("express");
const db = require('../models/setup');
const films = db.models.Film;
const app = express.Router();

app.post('/new', function (req, res) {
    
  const {
    title,
    description,
    release_year,
    replacement_cost,
    rating,
    stock,
    CategoryCategoryId
    } = req.body;
  
    films.create({ 
    title,
    description,
    release_year,
    replacement_cost,
    rating,
    stock,
    CategoryCategoryId
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
    films.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
    films.findOne({
    where: {film_id: req.params.id}
  })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/byCategory/:id', function (req, res) {
  films.findAll({
  where: {CategoryCategoryId: req.params.id}
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
    title,
    description,
    release_year,
    replacement_cost,
    rating,
    stock,
    CategoryCategoryId
    } = req.body;
     
    films.update(
    {
        title,
        description,
        release_year,
        replacement_cost,
        rating,
        stock,
        CategoryCategoryId
    },
    {
      where: {film_id: req.params.id}
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
    where: {film_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;