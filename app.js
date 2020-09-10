const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'password',
    port: 5432,
})

intializedProductTable = `
CREATE TABLE IF NOT EXISTS product(
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(32),
    Type VARCHAR(8),
    Description VARCHAR(100)
);
`


;(async ()=>{
    let productTableCreationRespond = await new Promise(resolve => {
        pool.query(intializedProductTable, (err, res) => {
            resolve(res);
        });
    })
    console.log(productTableCreationRespond) 
    await testQueries(pool)
})()


