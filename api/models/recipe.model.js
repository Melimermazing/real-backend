const { DataTypes } = require('sequelize')
const  {sequelize}  = require('../../database')


const Recipe = sequelize.define(
    'recipe',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instruction: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredient: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { updatedAt: false }
)

module.exports = Recipe