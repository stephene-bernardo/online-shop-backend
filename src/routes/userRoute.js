var express = require('express')
var router = express.Router()
const UserDB = require('../db/userDB');
const middlewareAuth = require('../middlewareAuth')


module.exports = function(pool, passport) {
    let userDB = new UserDB(pool);

    router.post('', async function(req, res) {
        let result = await userDB.insert(req.body.username, req.body.password);
        res.json({response: `successfuly created user ${req.body.username}`});
    })
    
    router.post('/authenticate', passport.authenticate('local'), async function(req, res){
        // let result = await userDB.authenticate(req.query.username, req.query.password);
        res.json(req.session);
    })

    router.get('/profile', middlewareAuth.loginRequired, async function(req,res){
        res.json(req.session);
    })

    router.get('/logout', async (req, res) => {
        req.session.destroy();
        res.send('logout')
    })

    return router;
}