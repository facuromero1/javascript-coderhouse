const express = require('express');
const { param } = require('express/lib/request');
const { Router } = express;

let products = [{id: 1,
                title: 'Monitor Full HD',
                price: 15000,
                thumbail: "url"}];

const producRouter = Router();

producRouter.get('/api/products',(req,res) =>{
    res.send({products})
})

producRouter.get('/api/products/:id',(req,res) =>{
    const id = Number(req.params.id)
    const product = products.find(item => item.id === id)
    
    if(product){
        res.send({product})

    }
})

producRouter.post('/api/products',(req,res) =>{
    const Newproduct = req.body
    Newproduct.id = products.length + 1
    products.push(Newproduct)

    return res.status(201).json(Newproduct)
    


})

producRouter.put('/api/products',(req,res) =>{
    const id = Number(req.params.id)
    const indexProduct = products.findIndex(item => item.id === id)
    if(indexProduct === -1){
        res.status(404).json({
            error: 'item not found'
        })
    }
    else {
        products[indexProduct].title = req.body.title
        products[indexProduct].id = req.body.id
        products[indexProduct].price = req.body.price
        products[indexProduct].thumbail = req.body.thumbail

    }

})

producRouter.delete('/api/products/:id',(req,res) =>{
    
    const id = Number(req.params.id)
    const indexProduct = products.findIndex(item => item.id === id)
    if(indexProduct === -1){
        res.status(404).json({
            error: 'item not found'
        })
    }
    products = products.filter(item => item.id !== id)
    return res.status(204).json({products})
})

module.exports = producRouter