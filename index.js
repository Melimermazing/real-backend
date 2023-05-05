require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const {
    checkConnection,
    syncModels
} = require('./database/index')

const addRelations = require('./database/relations')

async function startDB() {
    await checkConnection()
    await addRelations()
    await syncModels()
}

function startExpress() {
    const app = express()
        .use(cors())
        .use(express.json())
        .use(morgan('dev'))

        .use('/api', require('./api/routes/index'))

        .listen(process.env.PORT, (err) => {
            console.log(`Listenting on port ${ process.env.PORT }`)
        })
}

async function start() {
    await startDB()
    await startExpress()
}

start()