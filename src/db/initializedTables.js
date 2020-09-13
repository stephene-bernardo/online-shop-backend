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
    Quantity INT,
    CONSTRAINT fk_product FOREIGN KEY (ProductID) REFERENCES product(ID),
    CONSTRAINT fk_user FOREIGN KEY (UserID) REFERENCES "user"(UserID)
);
`

module.exports = async function(pool, isDeletionOfDataEnabled, isCreationOfSampleDataEnabled){
    if(isDeletionOfDataEnabled === 'true'){
        let deleteBasketQuery = 'DROP TABLE IF EXISTS basket'
        let deleteProductQuery = 'DROP TABLE IF EXISTS product'
        let deleteUserQuery = 'DROP TABLE IF EXISTS "user"'
        let deleteBasketTable = await initializedTable(pool, deleteBasketQuery, "Basket Table is Deleted")
        let deleteUserTable = await initializedTable(pool, deleteUserQuery, "User Table is Deleted")
        let deleteProductTable = await initializedTable(pool, deleteProductQuery, "Product Table is Deleted")
        console.log(deleteBasketTable)
        console.log(deleteUserTable)
        console.log(deleteProductTable)
    }
    
    let productTableCreationRespond = await initializedTable(pool, intializedProductTable, "Product Table is Initialized")
    let userTableCreationRespond = await initializedTable(pool,initializedUserTable, "User Table is Initialized")
    let basketTableCreationRespond = await initializedTable(pool, initializedBasketTable, "Basket Table is Initialized");
    console.log(productTableCreationRespond) 
    console.log(userTableCreationRespond)
    console.log(basketTableCreationRespond)

    if(isCreationOfSampleDataEnabled === 'true'){
        console.log(await insertdefaultProducts(pool));
        console.log(await insertDefaultUser(pool));
    }
    
}

insertDefaultUser = function(pool){
    let defualtUserQuery= `
        INSERT INTO "user" (LoginName, Password) VALUES
        ('brightbats', 'secret'),
        ('shrewdlyrically', 'hidden'),
        ('remorsefulrebel', 'password'),
        ('reassuringhug', '12345'),
        ('positiveproblem', 'secure'),
        ('attractivemap', 'superSecureP@ssword')
    `;

    return new Promise(resolve => {
        pool.query(defualtUserQuery, (err, res) => {
            if(res){
                resolve(`inserted default user entries.`)
            }
        });
    });
}

insertdefaultProducts = function(pool){
    let defaultProductsQuery = `
        INSERT INTO product (name, type, description) VALUES
        ('Tekken ','Games', 'is a Japanese media franchise centered on a series of fighting video.'),
        ('Suikoden','Games', ' is a role-playing video game series originally created by Yoshitaka Murayama.'),
        ('Final Fantasy VII','Games','is a 1997 role-playing video game developed by Square for the PlayStation console. '),
        ('Sunflower','Music', 'is a song performed by American rapper Post Malone and American singer Swae Lee.'),
        ('Drops of Jupiter ','Music', ' is a song written and recorded by American rock band Train. '),
        ('Stuck on You','Music', 'is a song written by and originally recorded by Lionel Richie.'),
        ('Don Quixote','Books','The Ingenious Gentleman Don Quixote of La Mancha'),
        ('Adventures of Huckleberry Finn','Books', ' is a novel by Mark Twain, first published in the United Kingdom in December 1884'),
        ('Moby Dick','Books', 'is an 1851 novel by American writer Herman Melville. '),
        ('The Title That Has Thirty Char', 'Books', 'a title that has 30 character in lenght. this helps in testing limit.')
    `
    return new Promise(resolve => {
        pool.query(defaultProductsQuery, (err, res) => {
            if(res){
                resolve(`inserted default product entries.`)
            }
        });
    });
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