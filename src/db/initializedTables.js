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
    let deleteBasketQuery = 'DROP TABLE IF EXISTS basket'
    let deleteProductQuery = 'DROP TABLE IF EXISTS product'
    let deleteUserQuery = 'DROP TABLE IF EXISTS "user"'
    let deleteBasketTable = await initializedTable(pool, deleteBasketQuery, "Basket Table is Deleted")
    let deleteUserTable = await initializedTable(pool, deleteUserQuery, "User Table is Deleted")
    let deleteProductTable = await initializedTable(pool, deleteProductQuery, "Product Table is Deleted")
    console.log(deleteBasketTable)
    console.log(deleteUserTable)
    console.log(deleteProductTable)

    let productTableCreationRespond = await initializedTable(pool, intializedProductTable, "Product Table is Initialized")
    let userTableCreationRespond = await initializedTable(pool,initializedUserTable, "User Table is Initialized")
    let basketTableCreationRespond = await initializedTable(pool, initializedBasketTable, "Basket Table is Initialized");
    console.log(productTableCreationRespond) 
    console.log(userTableCreationRespond)
    console.log(basketTableCreationRespond)
}

initializedTable = function (pool, query,name) {
    return new Promise(resolve => {
        pool.query(query, (err, res) => {
            if(res){
                resolve(`${name}`)
            }
        });
    });
}