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


const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password'
const POSTGRES_HOST = process.env.POSSTGRES_HOST || '127.0.0.1';
const POSTGRES_PORT = process.env.POSTGRES_PORT ||  5432;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200'

const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
})

;(async ()=>{
    await initializedTables(pool);
    app.use(express.json());
    app.use(cors({credentials: true, origin: FRONTEND_URL}));
    app.use('/product', productRoute(pool));
    app.use('/user', userRoute(pool))
    app.use('/basket', basketRoute(pool))
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
})()


