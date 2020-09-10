const ProductDB = require('./productDB');
const UserDB = require('./userDB');
const BasketDB = require('./basketDB')

testProductDB = async function (pool){
    await new Promise(resolve => {
        pool.query('DELETE FROM product', (err, res) => {
            resolve(res);
        });
    })

    let productDB = new ProductDB(pool);
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
}

testUserDB = async function(pool){
    await new Promise(resolve => {
        pool.query('DELETE FROM "user"', (err, res) => {
            resolve(res);
        });
    })

    let userDB = new UserDB(pool);
    await userDB.insert("johndoe15", "secretdoe")
    await userDB.insert("slow5", "fast")

    let authorized = await userDB.authenticate("johndoe15", "secretdoe")
    console.log(authorized)
    let notAuthorized = await userDB.authenticate("johndoe15", "secretdo")
    console.log(notAuthorized)
    
}

testBasketDB = async function(pool){
    await new Promise(resolve => {
        pool.query('DELETE FROM basket', (err, res) => {
            resolve(res);
        });
    })

    await new Promise(resolve => {
        pool.query('DELETE FROM product', (err, res) => {
            resolve(res);
        });
    })

    await new Promise(resolve => {
        pool.query('DELETE FROM "user"', (err, res) => {
            resolve(res);
        });
    })

    let userDB = new UserDB(pool);
    let productDB = new ProductDB(pool);
    await userDB.insert("sally19", "act1")
    let value = await productDB.insert('donkey kong', 'Games', 'monkey monkey monkey')
    let value2 = await productDB.insert('Mario', 'Games', 'jump to save the princess')
    let userCreds =await  userDB.authenticate("sally19", "act1")


    let basketDB = new BasketDB(pool);
    await basketDB.insert(userCreds[0].userid, value)
    await basketDB.insert(userCreds[0].userid, value2)

    let sallyPurchases = await basketDB.findByUserId(userCreds[0].userid)

    console.log(sallyPurchases)

    
}

module.exports = async function(pool){
//   await testProductDB(pool);
//   await testUserDB(pool);
    await testBasketDB(pool);
}