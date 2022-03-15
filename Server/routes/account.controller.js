const bcrypt = require("bcrypt")
const express = require("express"); 
const jwt = require("jsonwebtoken")
let db = require('../models/setup');
let users = db.models.User
let staffs = db.models.Staff
const dotenv = require('dotenv');
dotenv.config()

const app = express.Router()

app.post('/login', function (req, res){
    if(!req.body.email){
        res.send("Vous n'avez pas entré d'email")
    }
    else{
        users.findOne({where:{email: req.body.email}})
        .then((user)=>{
            bcrypt.compare(req.body.password, user.password, (err, result)=> {
                if(result){
                  let response;
                  let token = jwt.sign({id_user: user.user_id}, process.env.SECRET_KEY, {expiresIn: '7d'})
                    staffs.findOne({where:{UserUserId: user.user_id}}).then((dataStaff)=>{
                      if(dataStaff){
                        response = {'token': token, 'idUser': user.user_id, 'idStaff': dataStaff.staff_id, 'isManager': dataStaff.isManager}
                      }
                      else{
                      }
                      res.json(response)
                    })
                }
                else{
                    res.send("Mot de passe érroné.")
                }
            })
        }
        )
    }
})

app.post('/register', function (req, res){
  console.log("BeforeFINDONE", req.body)
  users.findOne({where: {email: req.body.email}})
  .then((user)=>{
    console.log("findONE")
      if(user != null){
          res.json("Email déja existant")
      }
      else{
          bcrypt.hash(req.body.password, 10, (err, hash)=>{
              if(!err){
                  users.create({ 
                    firstName: req.body.firstName,
                    userName: req.body.userName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    AddressAddressId: req.body.AddressAddressId
                   })
                  .then((user)=>{
                      res.status(200).json(user)
                  })
                  .catch((err)=>{
                      res.status(400).json(err)
                  })
              }
              else{
                console.log("JE PASSE ICI ERR", err)
              }
          })
      }
  })
  .catch((err)=>{
      res.status(400).json(err)
  })

})

module.exports = app