const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')
const initializedTables = require('./src/db/initializedTables')

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'password',
    port: 5432,
})



;(async ()=>{
    await initializedTables(pool);
})()


