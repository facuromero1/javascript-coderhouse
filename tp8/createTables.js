const {mysqlConfig} = require('./db/mysql')
const {sqliteConfig} = require('./db/sqlite')
const knex = require('knex')(mysqlConfig)
const knexLite = require('knex')(sqliteConfig)

knex 
.schema
.createTable('products',table => {
    table.increments('id')
    table.string('product',50)
    table.float('float')
    table.string('thumnail',70)
})
.catch((err) => console.log(err))
.finally(() => knex.destroy())




knexLite
.schema
.createTable('messages',table => {
    table.increments('id')
    table.string('message',120)
    table.string('email',30)
    table.timestamp('created_at').defaultTo(knex.fn.now());
})
.catch((err) => console.log(err))
.finally(() => knex.destroy())

