module.exports = function(pool){
    this.pool = pool;

    this.insert = function(name, type, description){
        let result = 0;
        
        return new Promise(resolve => {
            this.pool.query('INSERT INTO product(name,type,description) VALUES($1,$2,$3) Returning id', 
            [name, type, description], (err,res)=>  {
                resolve(res.rows[0].id);
            })
        });
    }

    this.findAll = function(){
        return new Promise((resolve) => {
            this.pool.query('SELECT * FROM product', (err,res)=>  {
                resolve(res.rows);
            }) 
        })
    }

    this.findById = function(id) {
        return new Promise((resolve) => {
            this.pool.query(`SELECT * FROM product WHERE ID=${id}`, (err, res) =>  {
                resolve(res.rows);
            }) 
        })
    }

    this.findByName = function(name) {
        return new Promise((resolve) => {
            this.pool.query(`SELECT * FROM product WHERE name=\'${name}\'`, (err, res) =>  {
                resolve(res.rows);
            }) 
        })
    }
}
