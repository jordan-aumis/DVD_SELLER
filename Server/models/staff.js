const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        staff_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        isManager: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });
    return Staff;
}