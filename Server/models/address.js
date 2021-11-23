const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Address = sequelize.define('Address', {
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Address;
}