const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Purchase = sequelize.define('Purchase', {
        purchase_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
    });
    return Purchase;
}