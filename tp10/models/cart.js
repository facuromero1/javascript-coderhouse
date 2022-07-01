const mongoose = require('mongoose');
const {productSchema} = require('../models/product')

const cartSchema = new mongoose.Schema(
    {
    products: [productSchema]
    },
    {timestamps:true}  
);

const Cart = mongoose.model('Cart',cartSchema)
module.exports = {Cart, cartSchema};
