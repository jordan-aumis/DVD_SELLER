const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Customer = sequelize.define('Customer', {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        isAdult: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
    return Customer;
}