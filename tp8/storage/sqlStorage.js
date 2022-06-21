let knex;

class SqlStorage{
    constructor(config,table) {
        this.table = table
        knex = require('knex'),(config);
    }

   async saveProduct(product){
    try{
        const id = await knex(this.table).insert({
            product: product.title,
            price: Number(product.price),
            thumbnail: product.thumbnail,
        })
        return await knex(this.table).where({id})} 
        catch(err){
            console.log(err);}
    };

    async getById(id) {
        try{
        let idProduct = id
        let product = await knex(this.table).select('*').where('id'=== idProduct)
            return (product)}
        catch (err){
            console.log(err)} 
    };

    async getAllProducts(){
        try{
        return knex(this.table).select('*')
            .then((products) =>{
            console.log(`total products: ${products.length}`)
            products.forEach(product => {
                console.log(`${product.name} priced at: ${product.price} with stock of: ${product.stock}`)
            })})
        }
        catch (err) {
            console.log(err)}
        };
};

module.exports = SqlStorage;

