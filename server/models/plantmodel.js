// models/Plant.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../getConnect');

const Plant = sequelize.define('Plant', {
    plant_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
        validate: {
            min: 0.00,
        },
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    available_plants:{
        type: DataTypes.INTEGER,
      defaultValue: 7,
      validate: { min: 0 },
    }
}, {
    tableName: 'plants', // Optional: Explicitly define the table name
    timestamps: false,    // Optional: Disable timestamps (createdAt, updatedAt)
});

module.exports = Plant;
