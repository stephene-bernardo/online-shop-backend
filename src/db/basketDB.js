module.exports = function(pool){
    this.pool = pool;

    this.insert = function(userId, productId, quantity){
        return new Promise(resolve => {
            this.pool.query('INSERT INTO basket(userId, productid, quantity) VALUES($1,$2, $3) Returning id', 
            [userId, productId, quantity], (err,res)=>  {
                resolve(res.rows[0].id);
            })
        });
    }

    this.remove = function(id){
        return new Promise(resolve => {
            this.pool.query(`DELETE FROM basket WHERE id=${id}`, (err,res)=>  {
                resolve({"response": "row deleted"});
            })
        });
    }

    this.findAll = function(){
        return new Promise((resolve) => {
            this.pool.query('SELECT * FROM basket', (err,res)=>  {
                resolve(res.rows);
            }) 
        })
    }

    this.findByUserId = function(id) {
        let query = `
            SELECT basket.id, product.ID as productID ,product.name, product.type, product.description, basket.quantity FROM basket 
            INNER JOIN product ON basket.productID=product.ID
            INNER JOIN "user" ON basket.UserID="user".UserID
            WHERE "user".UserID=${id}
        `;
        return new Promise((resolve) => {
            this.pool.query(query, (err, res) =>  {
                resolve(res.rows);
            }) 
        })
    }

}
