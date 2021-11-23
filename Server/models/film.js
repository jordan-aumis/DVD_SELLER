const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Film = sequelize.define('Film', {
        film_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        release_year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        replacement_cost: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    });
    return Film;
}