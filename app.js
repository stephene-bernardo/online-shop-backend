const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')
const initializedTables = require('./src/db/initializedTables')

const productRoute = require('./src/routes/productRoute')
const userRoute = require('./src/routes/userRoute')
const basketRoute = require('./src/routes/basketRoute')
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');

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
    app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
    app.use('/product', productRoute(pool));
    app.use('/user', userRoute(pool))
    app.use('/basket', basketRoute(pool))
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
})()


