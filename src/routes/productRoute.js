var express = require('express')
var router = express.Router()
const ProductDB = require('../db/productDB')

module.exports = function(pool){
    let productDB = new ProductDB(pool);
    router.post('', async function(req, res) {
        let result = await productDB.insert(req.body.name, req.body.type, req.body.description);
        res.json({id: result});
    })
    

    router.get('/type', async function(req, res){
        let result = []
        result = await productDB.findTypes();
        res.json(result);
    })

    router.get('/:id', async function(req, res){
        let result = await productDB.findById(req.params.id);
        res.json(result);
    })
    
    router.get('', async function(req, res){
        let result = []
        if(req.query.name && req.query.type){
            result = await productDB.find(req.query.name, req.query.type)
        }
        else if(req.query.name){
            result = await productDB.findByName(req.query.name);
        }
        else if(req.query.type){
            result = await productDB.findByType(req.query.type);
        }else {
            result = await productDB.findAll();
        } 
        res.json(result);
    })


    return router;
};