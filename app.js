const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')
const initializedTables = require('./src/db/initializedTables')

const productRoute = require('./src/routes/productRoute')
const express = require('express')
const app = express()
const port = 3000

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'password',
    port: 5432,
})

;(async ()=>{
    await initializedTables(pool);
    app.use(express.json());
    app.use('/product', productRoute(pool))
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
})()


