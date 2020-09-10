module.exports = function(pool){
    this.pool = pool;

    this.insert = function(username, password){
        let result = 0;
        
        return new Promise(resolve => {
            this.pool.query('INSERT INTO "user"(LoginName, Password) VALUES($1,$2)', 
            [username, password], (err,res)=>  {
                resolve(res);
            })
        });
    }


    this.authenticate = function(username, password) {
        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM "user" WHERE LoginName='${username}' and Password='${password}'`, (err, res) =>  {
                resolve(res.rows);
            }) 
        })
    }
}
