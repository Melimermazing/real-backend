const { DataTypes } = require('sequelize')
const { sequelize }  = require('../../database')

const Recipe_Ingredient = sequelize.define(
    'recipe_ingredient',
    {
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    { updatedAt: false }
)

module.exports = Recipe_Ingredient