const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  port: process.env.DB_PORT,
  logging: false
})

async function checkConnection() {
  try {
    await sequelize.authenticate()
    console.log('Connection Succesful! :D')
  } catch (error) {
    throw error
  }
}

async function syncModels() {
  // const state = {
    //     alter: true,
    //     force: true
    // }

  try {
    await sequelize.sync(/*{force: true}*/)
    console.log('Models Synced! :D')
  } catch (error) {
    throw error
  }
}

module.exports = {
  sequelize,
  checkConnection,
  syncModels
}