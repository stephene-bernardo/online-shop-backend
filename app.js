const { Pool, Client } = require('pg')
const testQueries = require('./src/db/testQuery')
const initializedTables = require('./src/db/initializedTables')
const ProductDB = require('./src/db/productDB')
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

    let productDB = new ProductDB(pool);
    
    app.use(express.json());
    app.post('/product', async function(req, res) {
        let result = await productDB.insert(req.body.name, req.body.type, req.body.description);
        
        res.json({id: result});
    })

    app.get('/product/:id', async function(req, res){
        let result = await productDB.findById(req.params.id);
        res.json(result);
    })

    app.get('/product', async function(req, res){
        let result = []
        if(req.query.name){
            result = await productDB.findByName(req.query.name);
        }else {
            result = await productDB.findAll();
        } 
        res.json(result);
    })
      
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
})()


