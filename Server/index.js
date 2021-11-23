require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();
const port = 8080;
const bdd = require("./models/setup");
const user = require("./routes/users.controller");
const staff = require("./routes/staff.controller");
const purchase = require("./routes/purchase.controller");
const film = require("./routes/film.controller");
const customer = require("./routes/customer.controller");
const category = require("./routes/category.controller");
const address = require("./routes/address.controller");
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/user', user);
app.use('/staff', staff);
app.use('/purchase', purchase);
app.use('/film', film);
app.use('/customer', customer);
app.use('/category', category);
app.use('/address', address);

app.get('/', (req, res)=>{
    res.send("hello world")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

bdd.sequelize.sync({alter: true})
.then(() => {
    const port = 3050; 
    app.listen(port, () => {
        console.log("Ok ca marche");
        console.log("sur serveur" + port);
    });
});