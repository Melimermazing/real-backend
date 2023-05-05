const { DataTypes } = require('sequelize')
const  {sequelize}  = require('../../database')


const User = sequelize.define(
    'user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        }, 
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user'
        },
        /*createdAt: {
            type: DataTypes.STRING,
            defaultValue: function () {
                return new Date()
            }
        }*/    
    },
    { updatedAt: false }
)

module.exports = User