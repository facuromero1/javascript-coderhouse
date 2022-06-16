const express = require('express');
const Storage = require('/Users/facu/Documents/coderHouse/TPs/javascript-coderhouse/tp7/storage');

const { Router } = express;

const productsRouter = Router();
const cartRouter = Router();

const storage = new Storage();

const admin = true;
const checkAdmin = (req, res, next) => {
    if (admin) next();
    else
        return res.json({
            error: -1,
            descripcion: `Ruta ${req.url} método ${req.method} no autorizada`,
        });
};

productsRouter.get('/:id?',async (req,res)=>{
    if(req.params.id){
        return res.json(await storage.getProductById(req.params.id));
    }else
    return console.error("404 item not found")
});

productsRouter.post("/",checkAdmin,async(req,res)=>{
    await storage.createProduct(req.body);
    return res.sendStatus(201)
});

productsRouter.put("/:id",checkAdmin,async(req,res)=>{
    await storage.updateProduct(req.params.id, req.body)
    return res.sendStatus(204)
});

productsRouter.delete("/:id",checkAdmin,async(req,res)=>{
    await storage.deleteProduct(req.params.id)
    return res.sendStatus(204)
});

cartRouter.post("/",async (req,res) =>{
    const newCartId = await storage.createCart(req.params.id);
    res.json(newCartId);
});

cartRouter.delete("/:id",async (req,res)=>{
    await storage.deleteCart(req.params.id)
    res.sendStatus(201)
});

cartRouter.get("/:id/products",async(req,res)=>{
    const products = await storage.getCartsProducts(req.params.id);
    return res.json(products);
});

cartRouter.delete("/:id/products/:prodId",async(req,res)=>{
    await storage.deleteCartProducts(req.params.id,req.params.prodId)
    return sendStatus(204)
});

cartRouter.post("/:id/products",async(req,res)=>{
    await storage.addCartProduct(req.params.id, req.body.id);
    return res.sendStatus(204)

});


module.exports = {cartRouter, productsRouter};