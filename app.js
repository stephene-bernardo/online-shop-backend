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
initializedUserTable = `
CREATE TABLE IF NOT EXISTS "user"(
    UserID SERIAL PRIMARY KEY,
    LoginName VARCHAR(20),
    Password VARCHAR(20)
);
`

initializedBasketTable = `
CREATE TABLE IF NOT EXISTS basket(
    ID SERIAL PRIMARY KEY,
    ProductID INT,
    UserID INT,
    CONSTRAINT fk_product FOREIGN KEY (ProductID) REFERENCES product(ID),
    CONSTRAINT fk_user FOREIGN KEY (UserID) REFERENCES "user"(UserID)

);
`

;(async ()=>{
    let productTableCreationRespond = await new Promise(resolve => {
        pool.query(intializedProductTable, (err, res) => {
            resolve(res);
        });
    })
    let userTableCreationRespond = await new Promise(resolve => {
        pool.query(initializedUserTable, (err, res) => {
            resolve(res);
        });
    })

    let basketTableCreationRespond = await new Promise(resolve => {
        pool.query(initializedBasketTable, (err, res) => {
            resolve(res);
        });
    })
    console.log(productTableCreationRespond) 
    console.log(userTableCreationRespond)
    console.log(basketTableCreationRespond)
    await testQueries(pool)
})()


