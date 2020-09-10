const ProductDB = require('./productDB');
const UserDB = require('./userDB');
const BasketDB = require('./basketDB')

module.exports = async function(pool){
    let productDB = new ProductDB(pool);
    let userDB = new UserDB(pool);
    let basketDB = new BasketDB(pool);

    await testProductDB(pool, productDB);
    await testUserDB(pool, userDB);
    await testBasketDB(pool, userDB, productDB, basketDB);
}



testProductDB = async function (pool, productDB){
    value = await productDB.insert('witcher', 'Games', 'too many witchsss')
    value = await productDB.insert('witchere', 'Games', 'too many witchsss3')
    console.log(`inserted Product in ID: ${value}`);

    let valueFindAll = await productDB.findAll()
    console.log(valueFindAll);

    let valueFindById = await productDB.findById(value)
    console.log(valueFindById)

    let valueFindByIdMissing = await productDB.findById(1000)
    console.log(valueFindByIdMissing)

    let valueFindByName = await productDB.findByName('witchere')
    console.log(valueFindByName)

    await deleteProductDBentry(pool);
}

testUserDB = async function(pool, userDB){
    await userDB.insert("johndoe15", "secretdoe")
    await userDB.insert("slow5", "fast")

    let authorized = await userDB.authenticate("johndoe15", "secretdoe")
    console.log(authorized)
    let notAuthorized = await userDB.authenticate("johndoe15", "secretdo")
    console.log(notAuthorized)
    
    await deleteUserDBentry(pool);
}

testBasketDB = async function(pool, userDB, productDB, basketDB){
    await userDB.insert("sally19", "act1")
    let value = await productDB.insert('donkey kong', 'Games', 'monkey monkey monkey')
    let value2 = await productDB.insert('Mario', 'Games', 'jump to save the princess')
    let userCreds =await  userDB.authenticate("sally19", "act1")

    await basketDB.insert(userCreds[0].userid, value)
    await basketDB.insert(userCreds[0].userid, value2)

    let sallyPurchases = await basketDB.findByUserId(userCreds[0].userid)

    console.log(sallyPurchases)

    await deleteBasketDBEntry(pool)
    await deleteProductDBentry(pool);
    await deleteUserDBentry(pool);

}

let deleteProductDBentry = function(pool){
    return new Promise(resolve => {
        pool.query('DELETE FROM product', (err, res) => {
            resolve(res);
        });
    })
}

let deleteUserDBentry = function(pool){
    return new Promise(resolve => {
        pool.query('DELETE FROM "user"', (err, res) => {
            resolve(res);
        });
    })
}

let deleteBasketDBEntry = function(pool){
    return new Promise(resolve => {
        pool.query('DELETE FROM basket', (err, res) => {
            resolve(res);
        });
    })
}