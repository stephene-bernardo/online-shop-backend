module.exports = function(pool){
    this.pool = pool;

    this.insert = function(userId, productId){
        let result = 0;
        
        return new Promise(resolve => {
            this.pool.query('INSERT INTO basket(userId, productid) VALUES($1,$2) Returning id', 
            [userId, productId], (err,res)=>  {
                resolve(res.rows[0].id);
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
            SELECT basket.id, product.ID as productID ,product.name, product.type, product.description FROM basket 
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
