intializedProductTable = `
CREATE TABLE IF NOT EXISTS product(
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(32),
    Type VARCHAR(8),
    Description VARCHAR(100)
);
`
initializedUserTable = `
CREATE TABLE IF NOT EXISTS "user"(
    UserID SERIAL PRIMARY KEY,
    LoginName VARCHAR(20),
    Password VARCHAR(20)
);
`

initializedBasketTable = `
CREATE TABLE IF NOT EXISTS basket(
    ID SERIAL PRIMARY KEY,
    ProductID INT,
    UserID INT,
    CONSTRAINT fk_product FOREIGN KEY (ProductID) REFERENCES product(ID),
    CONSTRAINT fk_user FOREIGN KEY (UserID) REFERENCES "user"(UserID)

);
`

module.exports = async function(pool){
    let productTableCreationRespond = await initializedTable(pool, "Product")
    let userTableCreationRespond = await initializedTable(pool, "User")

    let basketTableCreationRespond = await initializedTable(pool, "Basket");
    console.log(productTableCreationRespond) 
    console.log(userTableCreationRespond)
    console.log(basketTableCreationRespond)
}

initializedTable = function (pool, name) {
    return new Promise(resolve => {
        pool.query(initializedBasketTable, (err, res) => {
            if(res){
                resolve(`${name} Table is Initialized`)
            }
        });
    });
}