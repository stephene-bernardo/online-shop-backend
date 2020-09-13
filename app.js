const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')
const initializedTables = require('./src/db/initializedTables')

const productRoute = require('./src/routes/productRoute')
const userRoute = require('./src/routes/userRoute')
const basketRoute = require('./src/routes/basketRoute')
const express = require('express')
const app = express()
var cors = require('cors');

const PORT = process.env.PORT || 3000

const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password'
const POSTGRES_HOST = process.env.POSSTGRES_HOST || '127.0.0.1';
const POSTGRES_PORT = process.env.POSTGRES_PORT ||  5432;

const ONLINE_SHOP_FRONTEND_URL = process.env.ONLINE_SHOP_FRONTEND_URL || 'http://localhost:4200'

const ENABLE_DELETION_OF_DB_DATA = process.env.ENABLE_DELETION_OF_DB_DATA || 'true';
const ENABLE_CREATION_OF_SAMPLE_DATA = process.env.ENABLE_CREATION_OF_SAMPLE_DATA || 'true';
const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
})

;(async ()=>{
    await initializedTables(pool, ENABLE_DELETION_OF_DB_DATA, ENABLE_CREATION_OF_SAMPLE_DATA);
    app.use(express.json());
    app.use(cors({credentials: true, origin: ONLINE_SHOP_FRONTEND_URL}));
    app.use('/product', productRoute(pool));
    app.use('/user', userRoute(pool))
    app.use('/basket', basketRoute(pool))
    app.listen(PORT, () => {
    console.log(`Online Shopping backend is listening at PORT: ${PORT}`)
    })
})()


