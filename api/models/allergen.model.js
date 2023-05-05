const { DataTypes } = require('sequelize')
const  {sequelize}  = require('../../database')

const Allergen = sequelize.define(
    'allergen',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { updatedAt: false }
)

module.exports = Allergen