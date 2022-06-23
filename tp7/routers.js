const express = require('express');
const Storage = require('./storage.js');

const { Router } = express;

const productsRouter = Router();
const cartRouter = Router();

const container = new Storage();

const admin = true;
const checkAdmin = (req, res, next) => {
    if (admin) next();
    else
        return res.json({
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`,
        });
};

productsRouter.get('/api/products',async (req,res) => {
    return res.json(await container.getProducts())
})

productsRouter.get('/:id?',async (req,res)=>{
    let productId = req.params.id
    return res.json(container.getProductById(productId));
    
});

productsRouter.post("/",checkAdmin,async(req,res)=>{
    await container.createProduct(req.body);
    return res.sendStatus(201)
});

productsRouter.put("/:id",checkAdmin,async(req,res)=>{
    await container.updateProduct(req.params.id, req.body)
    return res.sendStatus(204)
});

productsRouter.delete("/:id",checkAdmin,async(req,res)=>{
    await container.deleteProduct(req.params.id)
    return res.sendStatus(204)
});

cartRouter.post("/",async (req,res) =>{
    const newCartId = await container.createCart();
    res.json(newCartId);
});

cartRouter.delete("/:id",async (req,res)=>{
    await container.deleteCart(req.params.id)
    res.sendStatus(201)
});

cartRouter.get("/:id/products",async(req,res)=>{
    const products = await container.getCartsProducts(req.params.id);
    return res.json(products);
});

cartRouter.delete("/:id/products/:prodId",async(req,res)=>{
    await container.deleteCartProducts(req.params.id,req.params.prodId)
    return sendStatus(204)
});

cartRouter.post("/:id/products",async(req,res)=>{
    await container.addCartProduct(req.params.id, req.body.id);
    return res.sendStatus(204)

});


module.exports = {cartRouter, productsRouter};