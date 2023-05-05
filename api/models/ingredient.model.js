const { DataTypes } = require('sequelize')
const  {sequelize}  = require('../../database')

const Ingredient = sequelize.define(
    'ingredient',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nutrition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { updatedAt: false }
)

module.exports = Ingredient