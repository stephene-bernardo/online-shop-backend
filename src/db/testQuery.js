const ProductDB = require('./productDB');
const UserDB = require('./userDB');
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

module.exports = async function(pool){
  await testProductDB(pool);
  await testUserDB(pool);
}