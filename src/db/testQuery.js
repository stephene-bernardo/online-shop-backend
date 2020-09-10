const ProductDB = require('./productDB')

testProductDB = async function (pool){
    let productTableCreationRespond = await new Promise(resolve => {
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

module.exports = async function(pool){
  await testProductDB(pool);
}