
const Sequelize = require('sequelize');

const sequelize = new Sequelize('dvd_seller', process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const address = require('./address')(sequelize);
const category = require('./category')(sequelize);
const customer = require('./customer')(sequelize);
const film = require('./film')(sequelize);
const purchase = require('./purchase')(sequelize);
const staff = require('./staff')(sequelize);
const user = require('./user')(sequelize);

address.hasOne(user, {
    onDelete: 'cascade',
});


customer.hasOne(purchase, {
    onDelete: 'cascade'
});

staff.hasOne(purchase, {
    onDelete: 'cascade'
});

user.hasOne(staff, {
    onDelete: 'cascade'
});

user.hasOne(customer, {
    onDelete: 'cascade'
});

category.hasOne(film, {
    onDelete: 'cascade'
});


const models = {
    User: user,
    Staff: staff,
    Purchase: purchase,
    Film: film,
    Customer: customer, 
    Category: category,
    Address: address
}

exports.sequelize = sequelize

exports.models = models