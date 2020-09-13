var express = require('express')
var router = express.Router()
const BasketDB = require('../db/basketDB');

module.exports = function(pool) {
    let basketDB = new BasketDB(pool);

    router.post('', async function(req, res) {
        let result = await basketDB.insert(req.body.userid, req.body.productid, req.body.quantity);
        res.json(result);
    })
    
    router.get('', async function(req, res){
        let result = await basketDB.findAll();
        res.json(result);
    })

    router.get('/:id', async function(req, res){ 
        let result = await basketDB.findByUserId(req.params.id);
        res.json(result)
    })

    router.delete('/:id', async function(req, res){
        let result = await basketDB.remove(req.params.id);
        res.json(result);
    })

    return router;
}