const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Menu_Planners = sequelize.define(
    'menu_planners',
    {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    { updatedAt: false }
)

module.exports = Menu_Planners