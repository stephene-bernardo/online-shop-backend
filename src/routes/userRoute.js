var express = require('express')
var router = express.Router()
const UserDB = require('../db/userDB');

module.exports = function(pool) {
    let userDB = new UserDB(pool);

    router.post('', async function(req, res) {
        let result = await userDB.insert(req.body.username, req.body.password);
        res.json({response: `successfuly created user ${req.body.username}`});
    })
    
    router.get('', async function(req, res){
        let result = await userDB.authenticate(req.query.username, req.query.password);
        res.json(result);
    })

    return router;
}