var express = require('express')
var router = express.Router()
const BasketDB = require('../db/basketDB');
const middlewareAuth = require('../middlewareAuth')

module.exports = function(pool) {
    let basketDB = new BasketDB(pool);

    router.post('',middlewareAuth.loginRequired, async function(req, res) {
        let result = await basketDB.insert(req.session.passport.user[0].userid, req.body.productid, req.body.quantity);
        res.json(result);
    })
    
    // router.get('',middlewareAuth.loginRequired,  async function(req, res){
    //     let result = await basketDB.findAll();
    //     res.json(result);
    // })

    router.get('',middlewareAuth.loginRequired, async function(req, res){ 
        let result = await basketDB.findByUserId(req.session.passport.user[0].userid);
        res.json(result)
    })

    router.delete('/:id', async function(req, res){
        let result = await basketDB.remove(req.params.id);
        res.json(result);
    })

    return router;
}