const express = require("express");
const db = require('../models/setup');
const staffs = db.models.Staff;
const app = express.Router();

app.post('/new', function (req, res) {

  const {
    isManager,
    UserUserId
    } = req.body;

    staffs.create({ 
        isManager,
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
    staffs.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
    staffs.findOne({
    where: {staff_id: req.params.id}
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
    isManager,
    UserUserId
    } = req.body;
     
    staffs.update(
    {
        isManager,
        UserUserId
    },
    {
      where: {staff_id: req.params.id}
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
    staffs.destroy({
    where: {staff_id: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;